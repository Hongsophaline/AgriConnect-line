import express from "express";
import connectDB from "./config/database";
import Router from "./routes/index";
import { setupSwagger } from "./config/swagger";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000; // number

// Enable JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", Router);

// Connect to MongoDB
connectDB();

// Setup Swagger
setupSwagger(app, PORT);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
