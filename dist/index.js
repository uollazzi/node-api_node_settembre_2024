"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const pages_1 = __importDefault(require("./routes/pages"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
// log richieste su DB? Custom Google Analytics? Perchè no
app.use((0, cors_1.default)()); // consideriamo valide le richieste ajax da qualsiasi origin (dominio es: localhost:4200, www.larepubblica.it)
// logging middleware
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("../public"));
app.use(express_1.default.json());
app.use("/", pages_1.default);
app.use("/api/", api_1.default);
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
module.exports = app;
