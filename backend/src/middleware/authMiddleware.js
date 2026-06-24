import jwt from "jsonwebtoken";
import { ApiError } from "../utilis/apiError.js"; 

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🛑 1. Check if the token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(403, "No token provided"));
  }

  // ✅ 2. Extract the token from header
  const token = authHeader.split(" ")[1];

  try {
    // ✅ 3. Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 4. Attach decoded info to req.user
    req.user = decoded;

    // ✅ 5. Continue to next middleware or route
    next();
  } catch (error) {
    // 🧱 Invalid or expired token
    next(new ApiError(401, "Invalid or expired token"));
  }
};
