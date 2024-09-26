import { Request, Response, Router } from "express";
import * as db from "../db";
import { LoggedUser, LoginUserDTO, RegisterUserDTO } from "../models/api/user";
import path from "node:path";
import jwt from "jsonwebtoken";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "public/uploads")
    },
    filename(req, file, callback) {
        const suffissoUnico = Date.now();
        console.log("LOG storage", file);
        const ext = path.extname(file.originalname);
        const fileName = file.originalname.replace(ext, "");

        callback(null, fileName + "_" + suffissoUnico + ext);
    },
});

const upload = multer({ storage: storage });

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Ciao sono il server!" });
});

router.post("/register", async (req: Request, res: Response) => {
    const user: RegisterUserDTO = req.body;

    try {
        // controllo che non ci sia già un utente registrato con questa email
        const u = await db.getUserByEmail(user.email);

        if (u) {
            res.status(400).json({ message: "Esiste già un utente con l'email: " + user.email });
            return;
        }

        const r = await db.registerUser(user);

        res.json({ message: "Registrazione avvenuta con successo" });
    } catch (error: any) {
        res.status(500).json({ message: error._message });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const login: LoginUserDTO = req.body;

    try {
        const user = await db.getUserByEmail(login.email);

        if (!user) {
            res.status(404).json({ message: "Utente non trovato" });
            return;
        }

        if (user.password != login.password) {
            res.status(404).json({ message: "Password non corretta" });
            return;
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                nome: user.nome
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        const loggedUser: LoggedUser = {
            token: token,
            user: {
                email: user.email,
                immagine: user.immagine,
                id: user._id.toString(),
                nome: user.nome,
            }
        }

        res.json(loggedUser);
    } catch (error: any) {
        res.status(500).json({ message: error._message });
    }
});

// rotta protetta (solo se in possesso di un valido jwt)
router.get("/area-riservata", async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(400).json({ message: "JWT mancante" });
            return;
        }

        const token = authHeader!.split(' ')[1];

        //Authorization: 'Bearer TOKEN'
        if (!token) {
            res.status(403).json(
                {
                    message: "Token non valido"
                }
            );
            return;
        }

        //Decoding the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

        // const u = await db.getUserById(decodedToken.id)
        res.status(200).json(decodedToken);
    } catch (error: any) {
        res.status(500).json({ message: error._message });
    }
});

router.post("/upload-image", upload.single("file"), async (req: Request, res: Response) => {
    const file = req.file?.filename;

    try {
        console.log("LOG upload-image", file);

        res.json({ fileName: file });
    } catch (error: any) {
        res.status(400).json({ message: error._message });
    }
});

router.get("/user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const u = await db.getUserById(id);

        if (!u) {
            res.status(404).json({ message: "Utente non esistente" });
            return;
        }

        res.json(u);
    } catch (error: any) {
        res.status(400).json({ message: error._message });
    }
});

export default router;