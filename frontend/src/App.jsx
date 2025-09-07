import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import useAuthStore from "./store/useAuth.js";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import MyArts from "./pages/MyArts.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import EditPage from "./pages/EditPage.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token) {
      useAuthStore.getState().setToken(token);
    }
    if (userData) {
      useAuthStore.getState().setUser(userData);
    }
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-arts" element={<MyArts />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-arts/edit/:id" element={<EditPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;