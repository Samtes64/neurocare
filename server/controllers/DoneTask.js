import DoneTasks from "../models/DoneTasks.js";
import createError from "http-errors";
import Patient from "../models/Patient.js";
import TherapistToPatientAssignedTask from "../models/TherapistToPatientAssignedTask.js";

export const addDoneTask = async (req, res, next) => {
  try {
    const { treatment, mood, duration, note,task } = req.body;
    const userId = req.user?.id;

    // Validate required fields
    if (!userId || !treatment) {
      return next(
        createError(400, "Patient and treatment fields are required.")
      );
    }

    try {
      // Check for existing patient with the same userId
      const patient = await Patient.findOne({user: userId})

      if (!patient) {
        return next(
          createError(404, "No patient found with the provided userId.")
        );
      }

      const assignedTask = await TherapistToPatientAssignedTask.findById(task);

      if (!assignedTask) {
        return next(createError(404, "No assigned task found with the provided taskId."));
      }

      assignedTask.status = 'Completed';
      await assignedTask.save();

      const newDoneTask = new DoneTasks({
        patient,
        treatment,
        mood,
        duration,
        note,
      });

      // Save the done task to the database
      const savedDoneTask = await newDoneTask.save();

      // Respond with the saved done task
      return res.status(201).json(savedDoneTask);
    } catch (error) {
      return next(
        createError(500, error)
      );
    }
  } catch (error) {
    return next(error);
  }

};
