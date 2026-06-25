import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// 🟢 Create a new todo (Protected)
router.post("/", verifyToken, createTodo);

// 🔵 Get all todos (Protected)
router.get("/", verifyToken, getTodos);

// 🟠 Update a todo by title (Protected)
router.put("/", verifyToken, updateTodo);

router.delete("/:id", verifyToken, deleteTodo);



export default router;
