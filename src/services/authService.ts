import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { userModel, IUser } from "../models/userModel";
import { ObjectId } from "mongoose";

// ------------------------
// JWT Token generator
// ------------------------
export const generateToken = (userID: string): string => {
  const secret: Secret = process.env.JWT_SECRETKEY as Secret;
  if (!secret) throw new Error("JWT_SECRETKEY is not defined");

  const expiresIn: string = process.env.JWT_EXPIRES_IN || "7d";

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"], // correct typing
  };

  return jwt.sign({ id: userID }, secret, options);
};

// Input type for registration (exclude Mongoose props)
interface IUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "admin" | "farmer" | "customer";
  isActive?: boolean;
}

// ------------------------
// REGISTER SERVICE
// ------------------------
export const registerService = async (
  req: Request
): Promise<{ user: Partial<IUser>; token: string }> => {
  const { name, email, password, phone } = req.body;

  // Check email
  const existingEmail = await userModel.findOne({ email });
  if (existingEmail) throw new Error("Email already exists");

  // Optional phone check
  if (phone) {
    const existingPhone = await userModel.findOne({ phone });
    if (existingPhone) throw new Error("Phone number already in use");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUserInput: IUserInput = {
    name,
    email,
    password: hashedPassword,
    phone,
    role: "customer",
    isActive: true,
  };

  const newUser = await userModel.create(newUserInput);

  // Generate token
  const token = generateToken((newUser._id as ObjectId).toString());

  // Return user without password
  return {
    user: {
      id: (newUser._id as ObjectId).toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isActive: newUser.isActive,
    },
    token,
  };
};

// ------------------------
// LOGIN SERVICE
// ------------------------
export const loginService = async (
  req: Request
): Promise<{ user: Partial<IUser>; token: string }> => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!user.isActive) throw new Error("Account is inactive");

  const token = generateToken((user._id as ObjectId).toString());

  return {
    user: {
      id: (user._id as ObjectId).toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
    },
    token,
  };
};

// ------------------------
// LOGOUT SERVICE
// ------------------------
export const logoutService = async (): Promise<{ message: string }> => {
  return { message: "Logout successful" };
};
