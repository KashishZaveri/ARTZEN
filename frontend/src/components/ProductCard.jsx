import React from "react";
import { Card, Image, Text, Button, AspectRatio } from "@chakra-ui/react";
const ProductCard = ({ product }) => {
  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      border={"0.3px solid black"}
      bgColor={"blue.100"}
    >
      <AspectRatio ratio={4 / 3} w="full">
        <Image
          src={product.image}
          alt={product.name}
          h={"48"}
          objectFit={"contain"}
        />
      </AspectRatio>
      <Card.Body gap="2">
        <Card.Title>{product.name}</Card.Title>
        <Card.Description>{product.description}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight">
          ${product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" rounded={"lg"} border={"2px solid blue"}>
          Buy now
        </Button>
        {/* <Button variant="ghost">Add to cart</Button> */}
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
