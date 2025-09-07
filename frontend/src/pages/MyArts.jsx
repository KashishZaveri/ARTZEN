import React, { useEffect, useRef } from "react";
import { Box, Grid, Heading, Spinner, Text } from "@chakra-ui/react";
import MyArtCard from "../components/MyArtCard.jsx";
import useArtStore from "../store/art.js";
import Toast from "bootstrap/js/dist/toast";
import { Link } from "react-router-dom";

const MyArts = () => {
  const toastRef = useRef(null);

  const { myArts, fetchMyArts, deleteArt, loading, error } = useArtStore();

  useEffect(() => {
    fetchMyArts();
  }, []);

  const handleDelete = async (id) => {
    await deleteArt(id);
    if (toastRef.current) {
      const toast = new Toast(toastRef.current);
      toast.show();
    }
  };

  return (
    <Box p={6}>
      <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          mb={8}
          fontWeight="bold"
        >
          ✨ My Arts ✨
        </Heading>


      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : !Array.isArray(myArts) || myArts.length === 0 ? (
        <Text>
          No artworks found.{" "}
          <Link
            to="/create"
            style={{ color: "blue.500", textDecoration: "underline" }}
          >
            Time to create something awesome!
          </Link>
        </Text>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={6}
          w="full"
        >
          {myArts.map((art) => (
            <MyArtCard key={art._id} art={art} onDelete={handleDelete} />
          ))}
        </Grid>
      )}

      {/* Bootstrap Toast for Delete */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
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
            <div className="toast-body">Product deleted successfully!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default MyArts;
