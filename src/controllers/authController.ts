import { Request, Response } from "express";
import {
  registerService,
  loginService,
  logoutService,
} from "../services/authService";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await registerService(req);
    res.status(201).json({ message: "Registration successful", user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginService(req);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const result = await logoutService();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
