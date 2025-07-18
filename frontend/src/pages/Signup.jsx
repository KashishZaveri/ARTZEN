import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuth.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const signup = useAuthStore((state) => state.signup);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  const nameValid = name.trim().length > 0;

  const [redirect, setRedirect] = useState(false);

  const handleSignup = async () => {
    if (!nameValid || !emailValid || !passwordValid) return;
    const result = await signup(name, email, password);
    if (result.success) setRedirect(true);
  };

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
        Sign Up
      </Heading>
      <Stack spacing={3}>
        <Input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          border={"1px solid black"}
        />
        {name && !nameValid && (
          <Text fontSize="xs" color="red.500" mt={-2} ml={1}>
            Name is required
          </Text>
        )}

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          border={"1px solid black"}
        />
        {email && !emailValid && (
          <Text fontSize="xs" color="red.500" mt={-2} ml={1}>
            Please enter a valid email address
          </Text>
        )}

        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"} // ✅ Toggle visibility
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          border={"1px solid black"}
        />
        {password && !passwordValid && (
          <Text fontSize="xs" color="red.500" mt={-2} ml={1}>
            Password must be 8+ characters, with uppercase, lowercase, and a
            number
          </Text>
        )}

        <Checkbox.Root onChange={() => setShowPassword(!showPassword)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control border="2px solid blue" />
          <Checkbox.Label> Show Password</Checkbox.Label>
        </Checkbox.Root>

        <Button
          onClick={handleSignup}
          rounded={"lg"}
          border={"2px solid blue"}
          isDisabled={!nameValid || !emailValid || !passwordValid}
        >
          Sign Up
        </Button>

        <Text fontSize="sm" textAlign="center">
          Already have an account? <Link to="/signin">Sign in</Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default Signup;
