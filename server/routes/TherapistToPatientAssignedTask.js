import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getAssignedTasksForPatient,
} from "../controllers/TherapistToPatientAssignedTask.js";


import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

// Create a new task
router.post("/", verifyToken, createTask);

// Get all tasks
router.get("/", verifyToken, getTasks);

// Get a task by ID
// router.get("/:id", verifyToken, getTaskById);

// Update a task
router.put("/:id", verifyToken, updateTask);

// Delete a task
router.delete("/:id", verifyToken, deleteTask);

router.get('/patient',verifyToken, getAssignedTasksForPatient);

export default router;
