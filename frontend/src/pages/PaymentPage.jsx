import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import { handlePayment } from "../store/razorpayCheckout.js";
import useAuthStore from "../store/useAuth.js";

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
    e.preventDefault();
    handlePayment(selectedProduct?.price, selectedProduct, newOrder, navigate);
  };

  return (
    <Container maxW={["100%", "container.sm"]} px={[4, 6]} py={[6, 10]}>
      <VStack spacing={[6, 8]}>
        <Heading
          as="h1"
          size={["lg", "2xl"]}
          textAlign="center"
          fontWeight="bold"
        >
          ✨ Billing ✨
        </Heading>

        <Box
          w="full"
          p={[4, 6]}
          bgColor="blue.100"
          rounded="lg"
          shadow="md"
          transition="all 0.3s ease-in-out"
          _hover={{ shadow: "lg" }}
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={[3, 4]}>
              <Input
                name="product"
                placeholder="Art Product Name"
                value={selectedProduct?.name || ""}
                readOnly
                bg="gray.100"
                cursor="not-allowed"
                border="1px solid black"
                size={["sm", "md"]}
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
                  required
                  size={["sm", "md"]}
                />
              ))}

              <Input
                placeholder="Total Amount"
                type="number"
                value={selectedProduct?.price || ""}
                readOnly
                bg="gray.100"
                border="1px solid black"
                size={["sm", "md"]}
              />

              <Button
                type="submit"
                mt={5}
                size={["sm", "md"]}
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