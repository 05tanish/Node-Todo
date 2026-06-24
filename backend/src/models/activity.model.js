import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },  // e.g. "LOGIN", "CREATE_TODO"
  description: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Activity", activitySchema);
