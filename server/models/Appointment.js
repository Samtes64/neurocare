import mongoose from "mongoose";

// Define Appointment Schema
const AppointmentSchema = new mongoose.Schema(
  {
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
    },
    patientIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
    ],
    isGroupAppointment: {
      type: Boolean,
      required: true,
      default: false,
    },
    appointmentDateTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

// Create Appointment model
export default mongoose.model("Appointment", AppointmentSchema);


