import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useProductStore } from "../store/product.js"; // assuming Zustand setup
import {
  Container,
  Box,
  VStack,
  Input,
  HStack,
  Button,
} from "@chakra-ui/react";
import Toast from "bootstrap/js/dist/toast";

const PaymentCard = () => {
  const location = useLocation();
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const toastRef = useRef(null);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleCardPayment = () => {
    if (!cardNumber || !expiry || !cvv || !nameOnCard) {
      const toast = new Toast(toastRef.current);
      toast.show();
    }
  };

  return (
    // <Container maxW={"container.sm"}>

    <Container maxW="container.sm" centerContent py={12}>
      <Box
        w={"100"}
        p={8}
        borderRadius="md"
        bgColor={"blue.100"}
        boxShadow="xl"
        textAlign="center"
        fontSize={{ base: "md", md: "lg" }}
        flexShrink={0}
      >
        <VStack spacing={4}>
          <Input
            placeholder="Card Number (XXXX XXXX XXXX)"
            maxLength={16}
            border={"1px solid black"}
          />
          <HStack spacing={4}>
            <Input
              placeholder="Expiry (MM/YY)"
              maxLength={5}
              border={"1px solid black"}
            />
            <Input
              placeholder="CVV"
              type="password"
              maxLength={3}
              border={"1px solid black"}
            />
          </HStack>
          <Input placeholder="Name on Card" border={"1px solid black"} />

          <Button
            mt={5}
            w={"60"}
            rounded={"lg"}
            border={"2px solid blue"}
            onClick={handleCardPayment}
          >
            Confirm Payment ₹{selectedProduct?.price}
          </Button>
        </VStack>
      </Box>

      {/* Bootstrap Toast */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className="toast align-items-center text-white bg-success border-0"
          role="alert"
          ref={toastRef}
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Payment Successful!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentCard;
