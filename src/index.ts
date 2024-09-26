import { config } from "dotenv";
config();

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import pagesRouter from "./routes/pages";
import apiRouter from "./routes/api";

const app = express();
const port = Number(process.env.PORT) || 3000;

// log richieste su DB? Custom Google Analytics? Perchè no

app.use(cors()); // consideriamo valide le richieste ajax da qualsiasi origin (dominio es: localhost:4200, www.larepubblica.it)

// logging middleware
app.use(morgan("tiny"));

app.use(express.static("../public"));

app.use(express.json());

app.use("/", pagesRouter);
app.use("/api/", apiRouter);

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});

module.exports = app;