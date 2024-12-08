import express from "express";
import LogInController from "../Controllers/LogInController.js";

const router = express.Router();

router.post("/login", LogInController.autenticarUsuario);

export default router;
