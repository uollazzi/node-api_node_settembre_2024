import { Request, Response, Router } from "express";
import fs from "node:fs";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    fs.writeFileSync("pippo.txt", "pippo");
    res.sendFile("pippo.txt");
    // res.send("Benvenuti sul server");
});

router.get("/guida", (req: Request, res: Response) => {
    res.send("La guida al server");
});

export default router;