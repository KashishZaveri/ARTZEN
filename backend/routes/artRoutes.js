import express from "express";
import {
  getMyArts,
  deleteMyArt,
  updateMyArt,
  getSingleArt,
} from "../controllers/artController.js";
import { protect } from "../Middleware/protect.js";

const router = express.Router();

// Apply protect middleware to all routes that require authentication
router.get("/my-arts", protect, getMyArts);
router.get("/my-arts/:id", protect, getSingleArt);
router.put("/my-arts/:id", protect, updateMyArt);
router.delete("/my-arts/:id", protect, deleteMyArt);

export default router;