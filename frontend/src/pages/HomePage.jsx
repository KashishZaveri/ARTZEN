import React from "react";
import { Link } from "react-router-dom";
import { Container, VStack, Text, SimpleGrid, Button, Heading} from "@chakra-ui/react";
import { useEffect } from "react";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container mb={10}>
      <VStack>
      <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          mb={8}
          fontWeight="bold"
          pt={10}
        >
          ✨ Welcome ✨
        </Heading>


        <SimpleGrid
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;