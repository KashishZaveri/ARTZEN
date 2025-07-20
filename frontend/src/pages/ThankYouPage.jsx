// src/pages/ThankYouPage.jsx
import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useAuthStore from "../store/useAuth.js";

const ThankYouPage = () => {
  const { user } = useAuthStore();

  return (
    <Box textAlign="center" mt={20}>
      <Heading mb={6}>Thank You! 🎨</Heading>
      <Text fontSize="lg">
      💐Your payment has been successfully processed. Your favourite art piece will arrive within 7 days!💐
      </Text>
    </Box>
  );
};

export default ThankYouPage;
