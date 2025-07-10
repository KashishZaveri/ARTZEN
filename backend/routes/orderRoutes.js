import express from "express";
import mongoose from "mongoose";
import { getMyOrders } from "../controllers/orderController.js";
import {protect} from "../Middleware/protect.js";

const router = express.Router();

router.get("/my-orders", protect, getMyOrders);

export default router;