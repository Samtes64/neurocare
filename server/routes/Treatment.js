import express from "express";

import {
addTreatment,
getAllTreatments
} from "../controllers/Treatments.js"

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();



router.get("/getalltreatments", getAllTreatments);
router.post("/",addTreatment)

export default router;