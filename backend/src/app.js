// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db_connection from "./database/db-config.js";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

// Connect to MongoDB
db_connection();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("✅ API is running successfully!");
});

// Global Error Handler (must be after routes)
app.use(errorHandler);

export default app;
