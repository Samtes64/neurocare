import mongoose from "mongoose";

const TherapistToPatientAssignedTaskSchema = new mongoose.Schema(
  {
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Completed", "Not completed"],
      default: "Not completed",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    date:{
      type:Date,
      required:true
    }
  },
  { timestamps: true }
);

export default mongoose.model("TherapistToPatientAssignedTask", TherapistToPatientAssignedTaskSchema);