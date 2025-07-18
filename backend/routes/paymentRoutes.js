import express from "express";
import {
  createOrder,
  sendBillEmail,
} from "../controllers/paymentController.js";
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/send-bill-email", sendBillEmail);

export default router;
