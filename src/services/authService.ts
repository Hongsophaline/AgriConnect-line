// src/services/authService.ts
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { userModel, IUser } from "../models/userModel";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "farmer";
}): Promise<IUser> => {
  const { name, email, password, role } = data;

  // Check if user exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  return user;
};

//login
export const generateToken = (user: IUser) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  const expiresInEnv = process.env.JWT_EXPIRES_IN || "1d";
  const options: SignOptions = {
    expiresIn: expiresInEnv as SignOptions["expiresIn"],
  };

  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, secret, options);
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  // Find user by email
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  return user;
};
