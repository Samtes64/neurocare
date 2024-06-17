import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllTherapists } from "../controllers/Therapist.js";


const router = express.Router();

router.get("/getalltherapists",verifyToken,getAllTherapists)

export default router;