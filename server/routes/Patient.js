import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getPatientDashboard } from "../controllers/Patient.js";

const router = express.Router();

router.get("/dashboard",verifyToken,getPatientDashboard)

export default router;