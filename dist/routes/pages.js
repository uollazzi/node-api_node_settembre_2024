"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Benvenuti sul server");
});
router.get("/guida", (req, res) => {
    res.send("La guida al server");
});
exports.default = router;
