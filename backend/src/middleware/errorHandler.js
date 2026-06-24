// src/middleware/errorHandler.js
import { errorResponse } from "../utilis/apiResponse.js";
import { ApiError } from "../utilis/apiError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  if (err instanceof ApiError) {
    return errorResponse(res, err.statusCode, err.message);
  }

  // Default fallback
  return errorResponse(res, 500, "Something went wrong!");
};
