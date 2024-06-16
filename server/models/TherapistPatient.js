import mongoose from "mongoose";


const TherapistPatientSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  Therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },
  date: {
    type: Date,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
},
{timestamps:true})

export default mongoose.model("TherapistPatient",TherapistPatientSchema)
