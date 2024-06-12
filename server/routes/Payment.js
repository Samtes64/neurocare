import express from "express"
import { addPayment, freePayment, paymentSuccess, verifyPayment } from "../controllers/Payment.js";
import { verifyToken } from "../middleware/verifyToken.js";




const router = express.Router();

router.post("/addpayment",verifyToken, addPayment)
router.post("/freepayment",verifyToken,freePayment)
router.get("/verifypayment/:id",verifyPayment)
router.get("/paymentsuccess",paymentSuccess)

export default router;