import { Request, Response, Router } from "express";
import * as db from "../db";
import { RegisterUserDTO } from "../models/api/user";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Ciao sono il server!" });
});

router.post("/register", async (req: Request, res: Response) => {
    const user: RegisterUserDTO = req.body;

    try {
        const r = await db.registerUser(user);

        res.json({ message: "Registrazione avvenuta con successo" });
    } catch (error: any) {
        res.status(400).json({ message: error._message });
    }
});

router.get("/users", (req: Request, res: Response) => {
    res.json([{ id: 1, nome: "Mario" }]);
});

export default router;