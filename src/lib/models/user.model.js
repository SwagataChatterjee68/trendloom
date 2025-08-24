import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
        default: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;