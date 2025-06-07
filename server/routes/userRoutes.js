import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router()

//Rota para registrar usuário
router.post("/register", registerUser);

//Rota de login
router.post("/login", loginUser)

export default router;