import mongoose from "mongoose";

const DoneTasksSchema = new mongoose.Schema(
  {
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
    mood: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DoneTask", DoneTasksSchema);
