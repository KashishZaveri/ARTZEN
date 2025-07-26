import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import { handlePayment } from "../store/razorpayCheckout.js";
import useAuthStore from "../store/useAuth.js";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProduct = useProductStore((state) => state.selectedProduct);

  const [newOrder, setNewOrder] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    item: "",
    quantity: "",
    totalAmount: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setNewOrder((prevOrder) => ({
        ...prevOrder,
        item: selectedProduct.name,
        totalAmount: selectedProduct.price,
      }));
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handlePayment(selectedProduct?.price, selectedProduct, newOrder, navigate);
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" my={4} fontWeight="bold">
          ✨ Billing ✨
        </Heading>

        <Box w="full" p={6} bgColor="blue.100" rounded="lg" shadow="md" mb={10}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                name="product"
                placeholder="Art Product Name"
                value={selectedProduct?.name || ""}
                readOnly
                bg="gray.100"
                cursor="not-allowed"
                border="1px solid black"
              />

              {[
                ["name", "Name"],
                ["email", "Email"],
                ["phone", "Phone Number"],
                ["address", "Address"],
                ["city", "City"],
                ["state", "State"],
                ["zip", "Zip Code"],
                ["country", "Country"],
              ].map(([field, label]) => (
                <Input
                  key={field}
                  name={field}
                  placeholder={label}
                  value={newOrder[field]}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, [field]: e.target.value })
                  }
                  border="1px solid black"
                />
              ))}

              <Input
                placeholder="Total Amount"
                type="number"
                value={selectedProduct?.price || ""}
                readOnly
                bg="gray.100"
                border="1px solid black"
              />

              <Button
                type="submit"
                mt={5}
                w="auto"
                rounded="lg"
                border="2px solid blue"
                colorScheme="blue"
                isDisabled={!selectedProduct}
              >
                Pay ₹{selectedProduct?.price}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default PaymentPage;
