import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["admin", "patient", "therapist"],
      default: null,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
