import { mongoose } from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      art: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Art",
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["Paid", "Failed", "Pending"], // Add more statuses as needed
  }, // e.g., "Paid", "Failed", "Pending"
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
