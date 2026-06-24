// ✅ Custom API Error Class (extend for advanced control)
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
