import React, { useEffect } from "react";
import { useOrderStore } from "../store/order";
import useAuthStore from "../store/useAuth";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Badge,
  Stack,
} from "@chakra-ui/react";

const MyOrders = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    } else {
      console.warn("User ID missing. Order fetch skipped.");
    }
  }, []);

  if (!orders.length) {
    return (
      <Box p={8} textAlign="center">
        <Heading size="md">You haven't placed any orders yet.</Heading>
        <Text mt={2}>
          Once you complete a purchase, your orders will appear here.
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} p={6} align="stretch">
      <Heading as="h2" size="2xl" textAlign="center" mb={8} fontWeight="bold">
        ✨ My Orders ✨
      </Heading>

      {orders.map((order) => (
        <Box key={order._id} p={5} rounded="md" shadow="md">
          <Stack direction="row" justify="space-between" wrap="wrap">
            <Text>
              <strong>Payment ID:</strong> {order.paymentId}
            </Text>
            <Badge colorScheme="green">{order.paymentStatus}</Badge>
          </Stack>
          <Text mt={2}>
            <strong> Ordered At: </strong>{" "}
            {new Date(order.orderedAt).toLocaleString()}
          </Text>
          <Text mt={2}>
            <strong> Address: </strong> {order.address.street},{" "}
            {order.address.city}, {order.address.state}, {order.address.zip}
          </Text>
          <Text mt={1}>
            {" "}
            <strong>Phone: </strong> {order.address.phone}
          </Text>

          <VStack spacing={4} mt={4}>
            {order.items.map((item, idx) => (
              <Box key={idx} borderWidth="1px" rounded="md" p={3}>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  align="center"
                  spacing={4}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    boxSize="100px"
                    objectFit="cover"
                    rounded="md"
                  />
                  <Box>
                    <Text fontWeight="medium">{item.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Price: ₹{item.price}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            ))}
          </VStack>

          <Box mt={4}>
            <Text fontWeight="bold" fontSize="lg">
              💰 Total: ₹{order.totalAmount}
            </Text>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default MyOrders;
