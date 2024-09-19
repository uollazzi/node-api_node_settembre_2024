import mongoose from "mongoose";
import { UserModel } from "./models/db/user";
import { RegisterUserDTO } from "./models/api/user";

const DB_NAME = "finder";

export const registerUser = async (user: RegisterUserDTO) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: DB_NAME });

        const u = new UserModel();
        u.nome = user.nome;
        u.annoNascita = user.annoNascita;
        u.genere = user.genere;

        return await u.save();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}