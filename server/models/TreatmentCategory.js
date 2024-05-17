import mongoose from "mongoose";

const TreatmentCategory = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TreatmentCategory", TreatmentCategory);
