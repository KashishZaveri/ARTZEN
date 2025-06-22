import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";

import router from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use("/api/products", router);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
