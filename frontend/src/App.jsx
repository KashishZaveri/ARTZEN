import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import CreatePage from "./pages/CreatePage";
import BillingPage from "./pages/BillingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Add more routes as needed */}
      </Routes>
    </Box>
  );
}

export default App;
