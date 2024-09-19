import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import pagesRouter from "./routes/pages";
import apiRouter from "./routes/api";

const app = express();
const port = Number(process.env.PORT) || 3000;

// log richieste su DB? Custom Google Analytics? Perchè no

// logging middleware
app.use(morgan("tiny"));

app.use("/", pagesRouter);
app.use("/api/", apiRouter);

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});