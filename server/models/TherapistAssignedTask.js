import mongoose from "mongoose";

const TherapistAssignedTaskSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
    },
    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
    },
    mood: {
      type: Number,
    },
    note: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    isCompleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "TherapistAssignedTask",
  TherapistAssignedTaskSchema
);
