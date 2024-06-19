import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getDoneTasksByDate, getPatientDashboard, updatePatientDiagnosis } from "../controllers/Patient.js";
import Patient from "../models/Patient.js";

const router = express.Router();

router.get("/dashboard",verifyToken,getPatientDashboard)
router.get("/donetask",verifyToken,getDoneTasksByDate)
router.put('/update-diagnosis', verifyToken, updatePatientDiagnosis);

router.get('/allpatients', async (req, res) => {
    try {
      const patients = await Patient.find().populate('user', 'username email'); // Populate user details from 'User' model if needed
      res.status(200).json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ error: 'Failed to fetch patients.' });
    }
  });

export default router;