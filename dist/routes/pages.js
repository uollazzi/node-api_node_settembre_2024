"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_fs_1 = __importDefault(require("node:fs"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    node_fs_1.default.writeFileSync("pippo.txt", "pippo");
    res.sendFile("pippo.txt");
    // res.send("Benvenuti sul server");
});
router.get("/guida", (req, res) => {
    res.send("La guida al server");
});
exports.default = router;
