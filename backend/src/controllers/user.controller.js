import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utilis/apiError.js";
import { successResponse, errorResponse } from "../utilis/apiResponse.js";
import { logActivity } from "../utilis/activityLogger.js";

// 🟢 Update Profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, "User not found");

    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.username = req.body.username || user.username;
    user.phone = req.body.phone || user.phone;

    if (req.file && req.file.path) {
      user.avatar = req.file.path;
    }

    await user.save();
    return successResponse(res, 200, "Profile updated successfully", user);
  } catch (error) {
    next(error);
  }
};

// 🟣 Change Password
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return errorResponse(res, 404, "User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return errorResponse(res, 400, "Old password incorrect");

    const hashedNew = await bcrypt.hash(newPassword, 10);
    user.password = hashedNew;
    await user.save();

    await logActivity(user._id, "CHANGE_PASSWORD", "Password updated");

    return successResponse(res, 200, "Password changed successfully");
  } catch (error) {
    next(error);
  }
};

// ✅ Get Profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return errorResponse(res, 404, "User not found");

    return successResponse(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    next(error);
  }
};
