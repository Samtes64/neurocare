import express from "express";
import {
 
  createAppointment,
  
} from "../controllers/Appointment.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// // GET /appointments - Get all appointments
// router.get("/", getAppointments);

// // GET /appointments/:id - Get appointment by ID
// router.get("/:id", getAppointmentById);

// POST /appointments - Create a new appointment
router.post("/",verifyToken, createAppointment);

// // PUT /appointments/:id - Update appointment by ID
// router.put("/:id", updateAppointment);

// // DELETE /appointments/:id - Delete appointment by ID
// router.delete("/:id", deleteAppointment);

export default router;
