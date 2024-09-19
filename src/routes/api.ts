import { Request, Response, Router } from "express";
import * as db from "../db";
import { RegisterUserDTO } from "../models/api/user";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const user: RegisterUserDTO = req.body;

    await db.registerUser(user);

    res.json({ message: "Registrazione avvenuta con successo" });
});

router.get("/users", (req: Request, res: Response) => {
    res.json([{ id: 1, nome: "Mario" }]);
});

export default router;