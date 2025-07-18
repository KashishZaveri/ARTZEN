import Order from "../models/orderModel.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      orderedAt: -1,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch orders" });
  }
};
