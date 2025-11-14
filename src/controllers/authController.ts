import { Request, Response } from "express";
import { registerUser, generateToken } from "../services/authService";
import { loginUser } from "../services/authService";
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser({ name, email, password, role });

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
