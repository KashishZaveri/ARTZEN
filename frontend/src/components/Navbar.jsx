import React from "react";
import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { MenuItem } from "@chakra-ui/react";

import { Link, useLocation } from "react-router-dom";
import { FaPlusSquare, FaUserCircle } from "react-icons/fa";
import useAuthStore from "../store/useAuth.js"; // Assuming you have a Zustand store for authentication

const Navbar = () => {
  const { isAuthenticated, user, signout } = useAuthStore();
  const location = useLocation();
  return (
    <Container maxW={"100vw"} p={0} m={0}>
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
          {isAuthenticated ? (
            <Link to="/create">
              <Button px={4} py={2} rounded={"lg"}>
                <FaPlusSquare />
              </Button>
            </Link>
          ) : (
            <Link to="/signin" state={{ from: location }}>
              <Button px={4} py={2} rounded={"lg"}>
                <FaPlusSquare />
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button px={4} py={2} rounded={"lg"}>
                  <FaUserCircle />
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content bgColor={"black"}>
                    <>
                      <Link to={"/my-arts"} style={{ textDecoration: "none" }}>
                        <Menu.Item value="my-arts" color={"white"}>
                          My Arts
                        </Menu.Item>
                      </Link>
                      <Link
                        to={"/my-orders"}
                        style={{ textDecoration: "none" }}
                      >
                        <Menu.Item value="my-orders" color={"white"}>
                          New Orders
                        </Menu.Item>
                      </Link>
                      <Menu.Item
                        color={"white"}
                        onClick={() => {
                          signout();
                          window.location.href = "/"; // Optional: Redirect on signout
                        }}
                      >
                        Sign Out
                      </Menu.Item>
                    </>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
