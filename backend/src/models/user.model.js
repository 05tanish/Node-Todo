import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phonenumber: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    
  },
  avatar: {
  type: String,
  default: "",
},

}, { timestamps: true }); // adds createdAt & updatedAt automatically

export default mongoose.model("User", userSchema);
