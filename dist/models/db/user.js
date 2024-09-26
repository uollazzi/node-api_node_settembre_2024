"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    nome: { type: String, required: [true, "Nome obbligatorio"] },
    annoNascita: { type: Number, required: [true, "Anno nascita obbligatorio"] },
    genere: { type: String, required: [true, "Genere obbligatorio"] },
    immagine: { type: String, required: [true, "Immagine obbligatoria"] },
    email: { type: String, required: [true, "Email obbligatoria"] },
    password: { type: String, required: [true, "Password obbligatoria"] },
});
exports.UserModel = mongoose_1.default.model("User", userSchema, "users");
