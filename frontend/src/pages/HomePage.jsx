import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  VStack,
  Heading,
  SimpleGrid,
  Button,
  Text,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxW={["100%", "container.xl"]} px={[4, 6]} py={[6, 10]}>
      <VStack spacing={[6, 8]}>
        <Heading
          as="h2"
          size={["lg", "2xl"]}
          textAlign="center"
          fontWeight="bold"
        >
          ✨ Welcome ✨
        </Heading>

        {products.length === 0 ? (
          <Text fontSize={["md", "lg"]} color="gray.600" textAlign="center">
            No products found. Be the first to create one!
          </Text>
        ) : (
          <SimpleGrid
            columns={[1, 2, 3]}
            spacing={[6, 8]}
            w="full"
            minChildWidth="300px"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
