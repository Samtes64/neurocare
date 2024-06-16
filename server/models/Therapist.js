import mongoose from "mongoose";

const TherapistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    yearsOfExperience: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    isValid: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Therapist", TherapistSchema);
