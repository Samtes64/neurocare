import express from "express";

import {
addTreatment,
getAllTreatments,
getTreatmentsByCategory
} from "../controllers/Treatments.js"

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();



router.get("/getalltreatments", getAllTreatments);
router.post("/",addTreatment)
router.get("/byCategory/:categoryId", getTreatmentsByCategory);

export default router;