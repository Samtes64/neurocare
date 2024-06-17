import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllTherapists, getTherapistById } from "../controllers/Therapist.js";


const router = express.Router();

router.get("/getalltherapists",verifyToken,getAllTherapists)
router.get("/gettherapistbyid",verifyToken,getTherapistById)

export default router;