import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utilis/apiError.js";
import { successResponse } from "../utilis/apiResponse.js";
import { logActivity } from "../utilis/activityLogger.js";

// 🟢 Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, firstname , lastname, phonenumber } = req.body;

    // 1️⃣ Validate
    if (!username || !email || !password)
      throw new ApiError(400, "All fields are required");

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw new ApiError(400, "User already exists with this email");

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
const newUser = new User({
  username,
  firstname,
  lastname,
  email,
  phonenumber,
  password: hashedPassword
});
await newUser.save();

    return successResponse(res, 201, "User registered successfully", {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(new ApiError(404, "User not found"));
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// 🔵 Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate
    if (!email || !password)
      throw new ApiError(400, "Email and password are required");

    // 2️⃣ Check user
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    // 3️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return successResponse(res, 200, "Login successful", {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

// after successful login
await logActivity(user._id, "LOGIN", `${user.email} logged in`);

  } catch (err) {
    next(err);
  }
};
