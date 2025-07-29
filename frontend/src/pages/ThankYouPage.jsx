// src/pages/ThankYouPage.jsx
import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useAuthStore from "../store/useAuth.js";

const ThankYouPage = () => {
  const { user } = useAuthStore();

  return (
    <Box textAlign="center" mt={20}>
      <Heading size="lg" mb={4} textAlign="center">
        ✨ Thank you ✨
      </Heading>{" "}
      <Text fontSize="lg" my={2} textAlign="center">
        💐Your payment has been successfully processed. Your favourite art piece
        will arrive within 7 days!💐
      </Text>
    </Box>
  );
};

export default ThankYouPage;
