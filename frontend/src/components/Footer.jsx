// components/Footer.tsx
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Box, VStack, HStack, Text, Icon, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bgColor="blue.500" color="black" mt={10} pt={7}>
      <VStack>
        <HStack
          direction="row"
          textAlign="center"
          spacing={4}
          mt={{ base: 4, md: 0 }}
          pb={4}
        >
          <Link href="https://github.com/KashishZaveri/ARTZEN" isExternal>
            <Icon as={FaGithub} boxSize={6} color="black" />
          </Link>
          <Link href="https://linkedin.com/in/your-profile" isExternal>
            <Icon as={FaLinkedin} boxSize={6} color="black" />
          </Link>
          <Link href="#" isExternal>
            <Icon as={FaInstagram} boxSize={6} color="black" />
          </Link>
        </HStack>

        <Text textAlign="center" pb={4} fontSize="sm">
          © {new Date().getFullYear()} ARTZEN 🕊️. Crafted with ❤ by Kashish.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
