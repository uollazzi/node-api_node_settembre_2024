import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Benvenuti sul server");
});

router.get("/guida", (req: Request, res: Response) => {
    res.send("La guida al server");
});

export default router;