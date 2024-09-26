import mongoose from "mongoose";
import { IUser, UserModel } from "./models/db/user";
import { RegisterUserDTO } from "./models/api/user";

const DB_NAME = "finder";

export const registerUser = async (user: RegisterUserDTO) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: DB_NAME });

        const u = new UserModel();
        u.nome = user.nome;
        u.annoNascita = user.annoNascita;
        u.genere = user.genere;
        u.immagine = user.immagine;
        u.email = user.email;
        u.password = user.password;

        return await u.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: DB_NAME });

        const u = await UserModel.findOne({ email: email });

        return u;
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
}

export const getUserById = async (id: string) => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, { dbName: DB_NAME });

        const u = await UserModel.findById(id);

        return u;
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
}