import express from "express";
import mongoose from 'mongoose';
import { createBill } from "../controllers/billController.js";

const router = express.Router();

router.post("/billing", createBill);

export default router;
