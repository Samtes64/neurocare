import express from "express"
import { addPayment, paymentSuccess, verifyPayment } from "../controllers/Payment.js";




const router = express.Router();

router.get("/addpayment",addPayment)
router.get("/verifypayment",verifyPayment)
router.get("/paymentsuccess",paymentSuccess)

export default router;