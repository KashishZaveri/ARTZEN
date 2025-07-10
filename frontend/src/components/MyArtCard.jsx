import React from "react";
import {
  Card,
  Image,
  Text,
  Button,
  AspectRatio,
  HStack,
} from "@chakra-ui/react";
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
      <AspectRatio ratio={4 / 3} w="full">
        <Image
          src={art.image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={art.name || "Untitled"}
          objectFit="cover"
        />
      </AspectRatio>

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
            <Button 
            bgColor="black"
             border="2px solid blue" 
             borderRadius="lg">
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
