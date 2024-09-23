import mongoose from "mongoose";

interface IUser {
    nome: string;
    annoNascita: number;
    genere: string;
    immagine: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    nome: { type: String, required: [true, "Nome obbligatorio"] },
    annoNascita: { type: Number, required: [true, "Anno nascita obbligatorio"] },
    genere: { type: String, required: [true, "Genere obbligatorio"] },
    immagine: { type: String, required: [true, "Immagine obbligatoria"] },
    email: { type: String, required: [true, "Email obbligatoria"] },
    password: { type: String, required: [true, "Password obbligatoria"] },
});

export const UserModel = mongoose.model<IUser>("User", userSchema, "users");