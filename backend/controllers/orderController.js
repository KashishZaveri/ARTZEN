import express from "express";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch your orders" });
  }
};
