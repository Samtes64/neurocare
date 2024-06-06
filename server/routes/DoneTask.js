import express from "express"

import { addDoneTask } from "../controllers/DoneTask.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.post("/adddonetask",verifyToken, addDoneTask)

export default router;