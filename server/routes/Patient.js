import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getDoneTasksByDate, getPatientDashboard, updatePatientDiagnosis } from "../controllers/Patient.js";

const router = express.Router();

router.get("/dashboard",verifyToken,getPatientDashboard)
router.get("/donetask",verifyToken,getDoneTasksByDate)
router.put('/update-diagnosis', verifyToken, updatePatientDiagnosis);

export default router;