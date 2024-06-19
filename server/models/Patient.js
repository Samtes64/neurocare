import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
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
    diagnosis: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", PatientSchema);
