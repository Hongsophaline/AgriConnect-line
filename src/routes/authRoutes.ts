import { Router } from "express";
import {
  registerController,
  loginController,
  //   logoutController,
} from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sophaline"
 *               email:
 *                 type: string
 *                 example: "sophaline@example.com"
 *               password:
 *                 type: string
 *                 example: "LineSecurePassword123"
 *               phone:
 *                 type: string
 *                 example: "070836872"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email or phone already exists
 */
router.post("/register", registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "sophaline@example.com"
 *               password:
 *                 type: string
 *                 example: "LineSecurePassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginController);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
// router.post("/logout", logoutController);

export default router;
