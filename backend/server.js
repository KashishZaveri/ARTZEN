import express from "express";
import dotenv from "dotenv";

dotenv.config();

import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import artRoutes from "./routes/artRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// import  authenticateUser  from "./Middleware/authMiddleware.js";
import { protect } from "./Middleware/protect.js"; // Uncomment if you need authentication middleware

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


// app.use(cors({ origin: '*' }));
app.use(
  cors({
     origin: process.env.FRONTEND_URL, 
     credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowdHeaders: ['Content-Type', 'Authorization'],
    }));
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/arts", artRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes); // Protect the order routes



app.listen(PORT, '0.0.0.0', () => {
  connectDB();
  console.log(`Server started at on port ${PORT}`);
});
