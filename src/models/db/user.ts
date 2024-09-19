import mongoose from "mongoose";

interface IUser {
    nome: string;
    annoNascita: number;
    genere: string;
}

const userSchema = new mongoose.Schema<IUser>({
    nome: { type: String, required: [true, "Nome obbligatorio"] },
    annoNascita: { type: Number, required: [true, "Anno nascita obbligatorio"] },
    genere: { type: String, required: [true, "Genere obbligatorio"] },
});

export const UserModel = mongoose.model<IUser>("User", userSchema, "users");