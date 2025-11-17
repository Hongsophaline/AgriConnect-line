import { Document } from "mongoose";

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: number;
  address?: string;
  role: "admin" | "farmer" | "constumer";
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
