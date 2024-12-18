import express from "express";
import LogInController from "../Controllers/LogInController.js";

const router = express.Router();

router.post("/login", LogInController.autenticarUsuario);

router.post("/signup", LogInController.registrarUsuario);

export default router;
