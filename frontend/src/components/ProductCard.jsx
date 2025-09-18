import React from "react";
import { Card, Image, Text, Box, Button } from "@chakra-ui/react";

import { Link, useLocation } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import useAuthStore from "../store/useAuth.js"; // Assuming you have a Zustand store for authentication

const ProductCard = ({ product }) => {
  const { isAuthenticated, user, signout } = useAuthStore();

  const location = useLocation();

  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct
  );
  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      border={"0.3px solid black"}
      bgColor={"blue.100"}
      m={4}
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
      _active={{ transform: "scale(1.03)" }}
      _focus={{ transform: "scale(1.03)" }}
    >
      <Box maxW="400px" maxH="300px" overflow="hidden">
        <Image
          src={product.image}
          alt={product.name}
          objectFit="contain"
          width="100%"
          height="100%"
          borderBottom={"1px solid black"}
        />
      </Box>

      <Card.Body gap="2">
        <Card.Title>{product.name}</Card.Title>
        <Card.Description>{product.description}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight">
          ₹{product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        {isAuthenticated ? (
          <Link to="/payment" onClick={() => setSelectedProduct(product)}>
            <Button variant="solid" rounded={"lg"} border={"2px solid blue"}>
              Buy now
            </Button>
          </Link>
        ) : (
          <Link to="/signin" state={{ from: location }}>
            <Button variant="solid" rounded={"lg"} border={"2px solid blue"}>
              Buy now
            </Button>
          </Link>
        )}
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
