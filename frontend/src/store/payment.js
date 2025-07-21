// src/api/payment.js
import useAuthStore from "./useAuth.js";

export async function createOrder(amount) {
  try {
    const { token } = useAuthStore.getState();

    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // optional future enhancement
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) throw new Error("Failed to create Razorpay order");
    return await response.json();
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
}

export async function sendBillEmail(details) {
  try {
    const response = await fetch("/api/payment/send-bill-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });

    if (!response.ok) throw new Error("Failed to send confirmation email");

    const result = await response.json();
    console.log("Email + Order saved:", result);

    return result.data; // This is the fix
  } catch (error) {
    console.error("Send email error:", error);
    throw error;
  }
}
