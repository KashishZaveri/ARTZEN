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
        bgColor="blue.500"
        flexShrink={0}
        fontSize={{ base: "md", md: "lg" }}
      >
        <HStack spacing={2} alignItems="center" flexShrink={0}>
          <Link to="/">
            <Button px={4} py={2} rounded={"lg"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-house-door-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
              </svg>
            </Button>
          </Link>
          <Text
            pt={3}
            fontWeight="bold"
            fontSize={"xl"}
            textTransform="uppercase"
            textAlign="center"
            flexShrink={0}
            color="black"
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              ArtZen 🕊️
            </Link>
          </Text>
        </HStack>

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
                          My Orders
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
