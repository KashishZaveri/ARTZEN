import React from "react";

import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../store/useAuth.js";

const Signin = () => {
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const signin = useAuthStore((state) => state.signin);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;

  const handleSignin = async () => {
    try {
      const { success, message } = await signin(email, password);
      if (success) {
        setRedirect(true);
      } else {
        console.error("Signin failed:", message);
      }
    } catch (err) {
      console.error("Signin error:", err.message);
    }
  };
  // Redirect to home page if user is authenticated
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to={"/"} replace />; // Redirect to the page user came from
  }
  // Redirect to home page if redirect state is true

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={20}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      bgColor={"blue.100"}
    >
      <Heading mb={6} textAlign="center">
        Sign In
      </Heading>
      <Stack spacing={3}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          border={"1px solid black"}
        />
        {email && !emailValid && (
          <Text fontSize="xs" color="red" mt={-2} ml={1}>
            Please enter a valid email address
          </Text>
        )}

        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"} // Toggle visibility
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          border={"1px solid black"}
        />
        {password && !passwordValid && (
          <Text fontSize="xs" color="red.500" mt={-2} ms={1}>
            Password must be at least 8 characters
          </Text>
        )}

        <Checkbox.Root onChange={() => setShowPassword(!showPassword)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control border="2px solid blue" />
          <Checkbox.Label> Show Password</Checkbox.Label>
        </Checkbox.Root>

        <Button
          onClick={handleSignin}
          isDisabled={!emailValid || !passwordValid}
          rounded={"lg"}
          border={"2px solid blue"}
        >
          Sign In
        </Button>

        <Text fontSize="sm" textAlign="center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default Signin;
