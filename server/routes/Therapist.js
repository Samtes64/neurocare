import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { approveTherapist, getAllTherapists, getAllUnverifiedTherapists, getAlllTherapists, getPatientsForTherapist, getTherapistById, getTherapistByUserId, setTherapistForPatient, updateTherapistProfile } from "../controllers/Therapist.js";
import { downloadTherapistDocuments } from "../controllers/Document.js";



const router = express.Router();

router.get("/getalltherapists",verifyToken,getAllTherapists)
router.get("/gettherapistbyid",verifyToken,getTherapistById)
router.post("/settherapistforpatient",verifyToken,setTherapistForPatient)
router.put("/updatetherapist", verifyToken, updateTherapistProfile);
router.get("/gettherapistbyuserid", verifyToken, getTherapistByUserId);
router.get("/patients", verifyToken, getPatientsForTherapist);
router.get("/allunverified", getAllUnverifiedTherapists);
router.put('/approve/:therapistId',  approveTherapist);
router.get('/documents/download/:therapistId/', downloadTherapistDocuments);
router.get('/alltherapists', getAlllTherapists);

export default router;