// src/utils/razorpayCheckout.js
import { createOrder, sendBillEmail } from "./payment.js";
import useAuthStore from "./useAuth.js";
import { useOrderStore } from "./order.js";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BACKEND_URL;
const navigate = useNavigate();

export async function handlePayment(amount, selectedProduct, billingForm) {
  try {
    const order = await createOrder(amount); // Step 1: Razorpay order

    const { user } = useAuthStore.getState();

    const customerName = billingForm?.name || user?.name || "Guest";
    const customerEmail =
      billingForm?.email || user?.email || "guest@example.com";
    const productName = selectedProduct?.name || "Artzen Product";
    const productImage = selectedProduct?.image || ""; //  Use selected product image

    const billingDetails = {
      address: billingForm?.address || "",
      city: billingForm?.city || "",
      state: billingForm?.state || "",
      zip: billingForm?.zip || "",
      country: billingForm?.country || "",
      phone: billingForm?.phone || "",
    };

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Artzen",
      description: `Purchase - ${productName}`,
      handler: async (response) => {
        try {
          //  Send billing info and receive saved order
          const savedOrder = await sendBillEmail({
            userId: user?.id,
            paymentId: response.razorpay_payment_id,
            gatewayOrderId: order.id,
            productName,
            amount: order.amount / 100,
            image: selectedProduct?.image, // pass image here
            customerName,
            customerEmail,
            ...billingDetails,
          });

          navigate("/thank-you");
        } catch (error) {
          console.error(" Email or Order Sync Error:", error.message);
          alert("Payment succeeded but confirmation failed.");
        }
      },
      theme: { color: "#3182ce" },
    };

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Check <script> tag in index.html.");
      return;
    }

    new window.Razorpay(options).open(); // Step 6: Launch Razorpay
  } catch (error) {
    console.error("Checkout initiation failed:", error.message);
    alert("Unable to initiate payment. Please try again.");
  }
}
