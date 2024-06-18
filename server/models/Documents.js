import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },
  document: {
    type: String,
    required: false,
  },
  isValid: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default mongoose.model("Document", DocumentSchema);
