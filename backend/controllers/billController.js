import express from "express";
import mongoose from "mongoose";
import Bill from "../models/billModel.js";

export const createBill = async (req, res) => {
    const bill = req.body;
    try {
      if (
        !bill.name ||
        !bill.email ||
        !bill.phone ||
        !bill.address ||
        !bill.city ||
        !bill.state ||
        !bill.zip ||
        !bill.country ||
        !bill.item ||
        !bill.totalAmount
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }
  
      const newOrder = new Order(bill); // Ensure req.body contains fullName, email, etc.
      await newOrder.save();
  
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error('Error saving bill:', error.message);
      res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
  };
  