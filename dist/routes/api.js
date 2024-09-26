"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db = __importStar(require("../db"));
const node_path_1 = __importDefault(require("node:path"));
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, "public/uploads");
    },
    filename(req, file, callback) {
        const suffissoUnico = Date.now();
        console.log("LOG storage", file);
        const ext = node_path_1.default.extname(file.originalname);
        const fileName = file.originalname.replace(ext, "");
        callback(null, fileName + "_" + suffissoUnico + ext);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.get("/", (req, res) => {
    res.json({ message: "Ciao sono il server!" });
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        // controllo che non ci sia già un utente registrato con questa email
        const u = yield db.getUserByEmail(user.email);
        if (u) {
            res.status(400).json({ message: "Esiste già un utente con l'email: " + user.email });
            return;
        }
        const r = yield db.registerUser(user);
        res.json({ message: "Registrazione avvenuta con successo" });
    }
    catch (error) {
        res.status(500).json({ message: error._message });
    }
}));
router.post("/upload-image", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    try {
        console.log("LOG upload-image", file);
        res.json({ fileName: file });
    }
    catch (error) {
        res.status(400).json({ message: error._message });
    }
}));
router.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const u = yield db.getUserById(id);
        if (!u) {
            res.status(404).json({ message: "Utente non esistente" });
            return;
        }
        res.json(u);
    }
    catch (error) {
        res.status(400).json({ message: error._message });
    }
}));
exports.default = router;
