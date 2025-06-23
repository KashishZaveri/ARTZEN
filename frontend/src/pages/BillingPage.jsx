import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProductStore } from "../store/product.js";

const BillingPage = () => {
  const location = useLocation();
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
    totalAmount: "",
  });

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={8}
          fontWeight="bold"
          pt={10}
        >
          Billing
        </Heading>

        <Box
          w={"full"}
          p={6}
          bgColor={"blue.100"}
          rounded={"lg"}
          shadow={"md"}
          mb={10}
        >
          <VStack spacing={4}>
            <Input
              name="name"
              placeholder="Art Product Name"
              value={selectedProduct?.name || ""}
              isReadOnly
              bg="gray.100"
              cursor="not-allowed"
              border="1px solid black"
            />
            <Input
              border={"1px solid black"}
              placeholder="Name"
              name="name"
              value={newOrder.name}
              onChange={(e) =>
                setNewOrder({ ...newOrder, name: e.target.value })
              }
            />

            <Input
              border={"1px solid black"}
              placeholder="Email"
              name="email"
              type="email"
              value={newOrder.email}
              onChange={(e) =>
                setNewOrder({ ...newOrder, email: e.target.value })
              }
            />
            <Input
              border={"1px solid black"}
              placeholder="Phone Number"
              name="phone"
              type="tel"
              row={5}
              column={9}
              value={newOrder.phone}
              onChange={(e) =>
                setNewOrder({ ...newOrder, phone: e.target.value })
              }
            />
            <Input
              border={"1px solid black"}
              placeholder="Address"
              name="address"
              value={newOrder.address}
              onChange={(e) =>
                setNewOrder({ ...newOrder, address: e.target.value })
              }
            />

            <Input
              border={"1px solid black"}
              placeholder="City"
              name="city"
              value={newOrder.city}
              onChange={(e) =>
                setNewOrder({ ...newOrder, city: e.target.value })
              }
            />

            <Input
              border={"1px solid black"}
              placeholder="State"
              name="state"
              value={newOrder.state}
              onChange={(e) =>
                setNewOrder({ ...newOrder, state: e.target.value })
              }
            />

            <Input
              border={"1px solid black"}
              placeholder="Zip Code"
              name="zip"
              value={newOrder.zip}
              onChange={(e) =>
                setNewOrder({ ...newOrder, zip: e.target.value })
              }
            />

            <Input
              border={"1px solid black"}
              placeholder="Country"
              name="country"
              value={newOrder.country}
              onChange={(e) =>
                setNewOrder({ ...newOrder, country: e.target.value })
              }
            />

            <Input
              placeholder="Total Amount"
              type="number"
              value={selectedProduct?.price || ""}
              readOnly
              bg="gray.100"
              border="1px solid black"
            />

            <Link to={"/payment"}>
              <Button
                mt={5}
                w={"full"}
                rounded={"lg"}
                border={"2px solid blue"}
                //   onClick={handlePayment}
              >
                Pay ₹{selectedProduct?.price}
              </Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default BillingPage;
