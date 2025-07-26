import React from "react";
import { Card, Image, Text, Button, Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MyArtCard = ({ art, onDelete }) => {
  const handleDelete = async () => {
    await onDelete(art._id);
  };

  if (!art) return null;

  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      border="0.3px solid black"
      bgColor="blue.100"
    >
      <Box maxW="400px" maxH="300px" overflow="hidden">
        <Image
          src={art.image}
          alt={art.name}
          objectFit="contain"
          width="100%"
          height="100%"
        />
      </Box>

      <Card.Body gap="2">
        <Card.Title>{art.name}</Card.Title>
        <Card.Description>{art.description}</Card.Description>
        <Text fontWeight="medium" textStyle="lg">
          ₹{art.price}
        </Text>
      </Card.Body>

      <Card.Footer>
        <HStack>
          <Link to={`/my-arts/edit/${art._id}`}>
            <Button bgColor="black" border="2px solid blue" borderRadius="lg">
              Edit
            </Button>
          </Link>
          <Button
            bgColor="red.500"
            onClick={handleDelete}
            border={"2px solid red"}
            borderRadius="lg"
          >
            Delete
          </Button>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default MyArtCard;
