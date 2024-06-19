import TherapistToPatientAssignedTask from "../models/TherapistToPatientAssignedTask.js";
import { addDays, format, isValid, parseISO } from 'date-fns';

const generateDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(format(currentDate, 'yyyy-MM-dd'));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

export const createTask = async (req, res, next) => {
  try {
    const { treatment, date, patients } = req.body;
    const therapistId = req.user?.id; // Assuming req.user contains the authenticated therapist's information

    // Validate and parse date range
    let dateRange;
    if (date.from && date.to) {
      // Handle date range
      const startDate = parseISO(date.from);
      const endDate = parseISO(date.to);
      dateRange = generateDateRange(startDate, endDate);
    } else {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Prepare tasks to be created
    const tasks = patients.map(patientId =>
      dateRange.map(date => ({
        therapist: therapistId,
        patient: patientId,
        treatment,
        status: "Not completed",
        isActive: true,
        date,
      }))
    ).flat(); // Flatten the array of arrays into a single array of tasks

    // Save all tasks to the database
    const createdTasks = await TherapistToPatientAssignedTask.insertMany(tasks);

    res.status(201).json(createdTasks);
  } catch (error) {
    next(error); // Use next() to pass errors to the error handling middleware
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await TherapistToPatientAssignedTask.find().populate(
      "therapist patient treatment"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await TherapistToPatientAssignedTask.findById(
      req.params.id
    ).populate("therapist patient treatment");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const task = await TherapistToPatientAssignedTask.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await TherapistToPatientAssignedTask.findByIdAndDelete(
      req.params.id
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
