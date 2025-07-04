import React from "react";
import { Container, Flex, Text, HStack, Button, Menu, Portal } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlusSquare, FaUserCircle } from "react-icons/fa";


const Navbar = () => {
  return (
    <Container maxW="100vw" p={0} m={0}>
      <Flex
        px={4}
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir="row"
        bgColor="blue.600"
        flexShrink={0}
        fontSize={{ base: "md", md: "lg" }}
        color="black"
      >
        <Text
          pt={3}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          flexShrink={0}
          color="black"
        >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            ArtZen 🕊️
          </Link>
        </Text>

        <HStack spacing={2} alignItems="center" flexShrink={0}>
          <Link to="/create">
            <Button px={4} py={2} rounded={"lg"}>
              <FaPlusSquare />
            </Button>
          </Link>
          

          <Menu.Root>
      <Menu.Trigger asChild>
        <Button px={4} py={2} rounded={"lg"}>
          <FaUserCircle />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bgColor={"black"} >
            <Menu.Item value="my-arts" color={"white"}>My Arts</Menu.Item>
            <Menu.Item value="my-orders" color={"white"}>New Orders</Menu.Item>
            
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
