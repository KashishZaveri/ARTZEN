import React from "react";

import { useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useProductStore } from "../store/product.js"; // assuming Zustand setup

const PaymentPage = () => {
  const location = useLocation();
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  return (
    <Container maxW={"container.sm"} centerContent py={12}>
      <Box
        w={"100"}
        py={4}
        px={8}
        borderRadius="md"
        bgColor={"blue.100"}
        boxShadow="xl"
        textAlign="center"
        fontSize={{ base: "md", md: "lg" }}
        flexShrink={0}
      >
        <Heading as={"h4"} mb={6} flexShrink={0} pt={3}>
          Choose Your Payment Method
        </Heading>

        {/* Payment Method Logos */}
        <HStack  gap={5} mb={6} centerContent pl={7}>
          <Image
            src="https://tse2.mm.bing.net/th?id=OIP.iKTYyFCcopiFDDRNklegXQHaEK&pid=Api&P=0&h=180"
            alt={"Visa"}
            boxSize={"50px"}
            objectFit={"contain"}
            bgColor={"white"}
          />
          <Image
            src="https://s.yimg.com/fz/api/res/1.2/Stdvw1XQ1VtO_pAbezOn_Q--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/455282cf-009d-3ca7-8b79-db3c54e4138f/t_500x300"
            alt="MasterCard"
            boxSize="50px"
            objectFit={"contain"}
            bgColor={"white"}
          />
          <Image
            src="https://tse1.mm.bing.net/th?id=OIP.ZyjY9hj_UxgzxpvYMFaTdgHaHa&pid=Api&P=0&h=180"
            alt="Google Pay"
            boxSize="50px"
            objectFit={"contain"}
          />
          <Image
            src="https://up.yimg.com/ib/th?id=OIP.awfBJZqGdaKZ0lO3wgkCMgHaDt&pid=Api&rs=1&c=1&qlt=95&w=211&h=105"
            alt="Paytm"
            boxSize="50px"
            objectFit={"contain"}
            bgColor={"white"}
          />
        </HStack>

        {/* Payment Method Dropdown */}
        <VStack spacing={4} mb={6} textAlign="center">
          <Link
            to={"/payment/card"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Text
              value="card"
              w={"80"}
              border={"1px solid black"}
              borderRadius="md"
            >
              Credit / Debit Card
            </Text>
          </Link>
          <Link
            to={"/payment/upi"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Text
              value="upi"
              w={"80"}
              border={"1px solid black"}
              borderRadius="md"
            >
              UPI
            </Text>
          </Link>
          <Link
            to={"/payment/cod"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Text
              value="cod"
              w={"80"}
              border={"1px solid black"}
              borderRadius="md"
            >
              Cash on Delivery
            </Text>
          </Link>
        </VStack>

        {/* Order Summary */}
        <Box textAlign="left" mb={6}>
          <Text>
            <strong>Item:</strong> {selectedProduct?.name}
          </Text>
          <Text>
            <strong>Amount:</strong> ₹{selectedProduct?.price}
          </Text>
        </Box>

        {/* Pay Button */}
        
      </Box>
    </Container>
  );
};

export default PaymentPage;
