import React from "react";
import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
  });

  const {createProduct} = useProductStore();

  const handleProduct = async () => {
    try {
      const { success, message } = await createProduct(newProduct);
      console.log("✅ Success:", success);
      console.log("📝 Message:", message);
    } catch (err) {
      console.error("❌ Caught in CreatePage:", err.message);
    }
  };
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
          Create New Product
        </Heading>

        <Box w={"full"} p={6} bgColor={"blue.100"} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              border={"1px solid black"}
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Input
            border={"1px solid black"}
              placeholder="Art Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
            border={"1px solid black"}
              placeholder="Description"
              name="description"
              row={5}
              column={9}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Input
            border={"1px solid black"}
              placeholder="Price"
              name="price"
              type="number"
              min={0}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleProduct}>
              Create
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
