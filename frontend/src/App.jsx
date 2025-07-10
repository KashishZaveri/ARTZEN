import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import BillingPage from "./pages/BillingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PaymentCard from "./pages/PaymentCard.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import MyArts from "./pages/MyArts.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import EditPage from "./pages/EditPage.jsx";
import Footer from "./components/Footer.jsx";
import useAuthStore from "./store/useAuth.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 🔐 Restore token if present
const token = localStorage.getItem("token");
if (token) {
  useAuthStore.getState().setToken(token);
}

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/card" element={<PaymentCard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-arts" element={<MyArts />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-arts/edit/:id" element={<EditPage />} />
          {/* 🧭 Add more routes if needed */}
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
