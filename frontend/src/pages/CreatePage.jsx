import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";
import Toast from "bootstrap/js/dist/toast";
import useAuthStore from "../store/useAuth.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const CreatePage = () => {
  const toastRef = useRef(null);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const { createProduct } = useProductStore();

  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchProducts();
    }
  }, [token, isAuthenticated]);

  const handleProduct = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newProduct,
        price: Number(newProduct.price),
      };

      const { success, message } = await createProduct(payload);

      if (success && toastRef.current) {
        const toast = new Toast(toastRef.current);
        toast.show();
      }

      await fetchProducts();

      setNewProduct({ image: "", name: "", description: "", price: "" });
    } catch (err) {
      console.error("Caught in CreatePage:", err.message);
    }
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
          ✨ Create New Product ✨
        </Heading>

        <Box w="full" p={[4, 6]} bgColor="blue.100" rounded="lg" shadow="md">
          <form onSubmit={handleProduct} encType="multipart/form-data">
            <VStack spacing={[3, 4]}>
              <Input
                size={["sm", "md"]}
                border="1px solid black"
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                required
              />

              <Input
                size={["sm", "md"]}
                border="1px solid black"
                placeholder="Art Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />

              <Input
                size={["sm", "md"]}
                border="1px solid black"
                placeholder="Description"
                name="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                required
              />

              <Input
                size={["sm", "md"]}
                border="1px solid black"
                placeholder="Price"
                name="price"
                type="number"
                min={0}
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />

              <Button
                type="submit"
                size={["sm", "md"]}
                mt={5}
                rounded="lg"
                border="2px solid blue"
                colorScheme="blue"
              >
                Create
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>

      {/* Bootstrap Toast */}
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
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
            <div className="toast-body">Product created successfully!</div>
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

export default CreatePage;