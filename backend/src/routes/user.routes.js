import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { updateProfile, changePassword, getProfile } from "../controllers/user.controller.js";


const router = express.Router();

// 🟢 Get user profile
router.get("/profile", verifyToken, getProfile);

// 🟠 Update user profile (with image)
router.put("/update", verifyToken, updateProfile);

// 🔴 Change password
router.put("/change-password", verifyToken, changePassword);

export default router;
