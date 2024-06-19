import Appointment from "../models/Appointment.js";
import Therapist from "../models/Therapist.js";

// POST /appointments - Create a new appointment
export const createAppointment = async (req, res, next) => {
  const { patientIds, appointmentDateTime } = req.body;

  try {
    // Fetch therapistId from Therapist collection using userId
    const therapist = await Therapist.findOne({ userId: req.user.id }); // Assuming userId is available in req.user
    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    // Determine if it's a group appointment based on number of patientIds
    const isGroupAppointment = patientIds.length > 1;

    const newAppointment = new Appointment({
      therapistId: therapist._id,
      patientIds,
      isGroupAppointment,
      appointmentDateTime,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
