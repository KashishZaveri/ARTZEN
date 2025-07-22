import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../Middleware/protect.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", protect, createProduct);

export default router;
