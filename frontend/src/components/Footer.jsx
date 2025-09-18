import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Link,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";

const Footer = () => {
  const iconSize = useBreakpointValue({ base: 5, md: 6 });

  return (
    <Box bgColor="blue.500" color="black" mt={10} pt={7} pb={4}>
      <Container maxW={["100%", "container.md"]}>
        <VStack spacing={[4, 6]}>
          <HStack spacing={[4, 6]} justify="center">
            <Link href="https://github.com/KashishZaveri/ARTZEN" isExternal>
              <Icon as={FaGithub} boxSize={iconSize} color="black" />
            </Link>
            <Link href="https://linkedin.com/in/kashishzaveri" isExternal>
              <Icon as={FaLinkedin} boxSize={iconSize} color="black" />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FaInstagram} boxSize={iconSize} color="black" />
            </Link>
          </HStack>

          <Text textAlign="center" fontSize={["xs", "sm"]}>
            © {new Date().getFullYear()} ARTZEN 🕊️. Crafted with ❤ by Kashish.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;