import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import Order from "../models/orderModel.js"; // Assuming you have an Order model defined
import dotenv from "dotenv";

dotenv.config();

//  Razorpay instance setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      console.log("⚠️ Invalid amount:", amount);
      return res.status(400).json({ error: "Valid amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `artzen_receipt_${Date.now()}`,
    });

    console.log(" Razorpay Order created:", order.id);
    res.json(order);
  } catch (err) {
    console.error(" Create order failed:", err.message);
    res.status(500).json({ error: "Order creation failed" });
  }
};
export const sendBillEmail = async (req, res) => {
  const {
    userId,
    paymentId,
    gatewayOrderId,
    productName,
    amount,
    customerEmail,
    customerName,
    address,
    city,
    state,
    zip,
    country,
    phone,
  } = req.body;

  //  Validate input
  if (
    !paymentId ||
    !productName ||
    !amount ||
    !customerEmail ||
    !customerName
  ) {
    console.log("⚠️ Missing essential email fields:", req.body);
    return res.status(400).json({ error: "Missing required fields" });
  }

  //  Validate email credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error(" Missing email credentials in .env");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP is ready");
  } catch (error) {
    console.error("SMTP Error:", error.message);
    return res.status(500).json({ error: "Email service not available" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail.trim().toLowerCase(),
    subject: `Artzen | Payment Confirmation`,
    html: `
      <h2>Thank you for your purchase, ${customerName}!</h2>
      <p><strong>Product:</strong> ${productName}</p>
      <p><strong>Amount Paid:</strong> ₹${amount}</p>
      <p><strong>Payment ID:</strong> ${paymentId}</p>
      <h3>Billing Details:</h3>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Address:</strong> ${address}, ${city}, ${state}, ${zip}, ${country}</p>
      <p>— Team Artzen</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${customerEmail}`);

    //  Save the order in MongoDB
    const newOrder = new Order({
      userId,
      paymentId,
      gatewayOrderId,
      totalAmount: amount,
      paymentStatus: "Paid",
      status: "Confirmed",
      address: { street: address, city, state, zip, country, phone },
      items: [
        {
          name: productName,
          price: amount,
          image: req.body.image,
        },
      ],
      orderedAt: Date.now(),
    });

    const saved = await newOrder.save();
    console.log(" Order saved:", saved._id);
    res.status(200).json(saved);
  } catch (err) {
    console.error(" Email or DB error:", err.message);
    res.status(500).json({ error: "Confirmation failed" });
  }
};