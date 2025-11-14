// src/config/environment.ts

import dotenv from "dotenv";
dotenv.config();
export const environment = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
  JWT_SECRET: process.env.JWT_SECRET || "your_secret_key",
  PORT: process.env.PORT || 5000,
};
