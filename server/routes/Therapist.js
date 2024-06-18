import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllTherapists, getTherapistById, getTherapistByUserId, setTherapistForPatient, updateTherapistProfile } from "../controllers/Therapist.js";



const router = express.Router();

router.get("/getalltherapists",verifyToken,getAllTherapists)
router.get("/gettherapistbyid",verifyToken,getTherapistById)
router.post("/settherapistforpatient",verifyToken,setTherapistForPatient)
router.put("/updatetherapist", verifyToken, updateTherapistProfile);
router.get("/gettherapistbyuserid", verifyToken, getTherapistByUserId);

export default router;