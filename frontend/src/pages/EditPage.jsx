import React, { useEffect, useRef } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import useArtStore from "../store/art.js";
import Toast from "bootstrap/js/dist/toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const EditPage = () => {
  const toastRef = useRef(null);
  const artId = location.pathname.split("/").pop();

  const { editingArt, editArt, updateField, updateArt, fetchMyArts, updating } =
    useArtStore();

  useEffect(() => {
    if (artId) editArt(artId);
  }, [artId]);

  if (!editingArt) return <Spinner size="xl" mt={10} />;

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    const updatedArt = {
      image: editingArt.image,
      name: editingArt.name,
      description: editingArt.description,
      price: parseFloat(editingArt.price),
    };

    await updateArt(editingArt._id, updatedArt);
    await fetchMyArts();

    if (toastRef.current) {
      const toast = new Toast(toastRef.current);
      toast.show();
    }

    window.location.href =`${baseURL}/my-arts`;
  };

  return (
    <Container maxW="container.sm" rounded="lg">
      <VStack spacing={8}>
        <Heading size="2xl" textAlign="center" pt={10}>
          ✨ Edit Your Wonderful Art Product ✨
        </Heading>

        <Box w="full" p={6} bgColor="blue.100" rounded="lg" shadow="md">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                placeholder="Image URL"
                border="1px solid black"
                value={editingArt.image}
                onChange={(e) => updateField("image", e.target.value)}
                required
              />
              <Input
                placeholder="Art Name"
                border="1px solid black"
                value={editingArt.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
              <Input
                placeholder="Description"
                border="1px solid black"
                value={editingArt.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
              />
              <Input
                placeholder="Price"
                type="number"
                border="1px solid black"
                min={0}
                value={editingArt.price}
                onChange={(e) =>
                  updateField("price", parseFloat(e.target.value))
                }
                required
              />
              <Button
                type="submit"
                mt={3}
                border="2px solid blue"
                isLoading={updating}
                rounded="lg"
                colorScheme="blue"
              >
                Update
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>

      {/* Bootstrap Toast */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className="toast text-white bg-success border-0"
          role="alert"
          ref={toastRef}
        >
          <div className="d-flex">
            <div className="toast-body">Artwork updated successfully!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
            ></button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditPage;
