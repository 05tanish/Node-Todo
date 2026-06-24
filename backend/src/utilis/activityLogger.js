import Activity from "../models/activity.model.js";

export const logActivity = async (userId, action, description = "") => {
  try {
    await Activity.create({ userId, action, description });
  } catch (err) {
    console.error("Activity logging failed:", err.message);
  }
};
