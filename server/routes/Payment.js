import express from "express"
import { addPayment, paymentSuccess, verifyPayment } from "../controllers/Payment.js";
import { verifyToken } from "../middleware/verifyToken.js";




const router = express.Router();

router.post("/addpayment",verifyToken, addPayment)
router.get("/verifypayment",verifyPayment)
router.get("/paymentsuccess",paymentSuccess)

export default router;