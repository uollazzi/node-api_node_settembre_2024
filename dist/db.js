"use strict";
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
exports.getUserById = exports.getUserByEmail = exports.registerUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./models/db/user");
const DB_NAME = "finder";
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING, { dbName: DB_NAME });
        const u = new user_1.UserModel();
        u.nome = user.nome;
        u.annoNascita = user.annoNascita;
        u.genere = user.genere;
        u.immagine = user.immagine;
        u.email = user.email;
        u.password = user.password;
        return yield u.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        yield mongoose_1.default.disconnect();
    }
});
exports.registerUser = registerUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING, { dbName: DB_NAME });
        const u = yield user_1.UserModel.findOne({ email: email });
        return u;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        yield mongoose_1.default.disconnect();
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING, { dbName: DB_NAME });
        const u = yield user_1.UserModel.findById(id);
        return u;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        yield mongoose_1.default.disconnect();
    }
});
exports.getUserById = getUserById;
