import express from "express";
import mongoose from "mongoose";
import { getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/:userId", getOrders);

export default router;
