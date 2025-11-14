// src/routes/authRoutes.ts
import { Router } from "express";
import { registerController } from "../controllers/authController";
import { loginController } from "../controllers/authController";
const router = Router();

// POST /api/auth/register
router.post("/register", registerController);
router.post("/login", loginController);
export default router;
