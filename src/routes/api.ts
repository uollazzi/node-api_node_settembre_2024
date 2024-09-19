import { Request, Response, Router } from "express";

const router = Router();

router.get("/posts", (req: Request, res: Response) => {
    res.json([{ id: 1, titolo: "Ciao" }]);
});

router.get("/users", (req: Request, res: Response) => {
    res.json([{ id: 1, nome: "Mario" }]);
});

export default router;