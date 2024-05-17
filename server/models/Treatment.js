import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema(
  {
    treatmentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TreatmentCategory",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    treatmentName: {
      type: String,
      required: true,
    },
    treatmentDescription: {
      type: String,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Treatment", TreatmentSchema);
