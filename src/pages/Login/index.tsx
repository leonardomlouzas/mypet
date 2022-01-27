import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import { Link as DomLink } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

import Logo from "../../assets/Logo.svg";
import { Input } from "../../components/Form/Input";

export const Login = () => {
  return (
    <Flex
      as="main"
      w="100%"
      h="100vh"
      justifyContent="space-evenly"
      align="center"
      bgGradient={"linear(to-r, blue.300 65%, yellow.300 35%)"}
    >
      <Flex align="stretch" w="30%">
        <Image src={Logo} mr="30px" w="100px" />
        <Box w="300px">
          <Heading as="h1" fontSize="3xl" color="gray.900" mb="20px">
            MyPets
          </Heading>
          <Text color="gray.900" fontSize="lg">
            Uma maneira fácil e prática para gerenciar seus pets.
          </Text>
        </Box>
      </Flex>
      <Flex
        as="form"
        w="40%"
        bg="white"
        flexDirection="column"
        alignItems="center"
        padding="40px"
        borderRadius="10px"
      >
        <Heading as="h1" textAlign="center" mb="20px">
          Login
        </Heading>
        <VStack w="100%" spacing="20px">
          <Input Icon={ FaUserAlt } type="text" label="E-mail" placeholder="exemplo@exemplo.com" />
          <Input Icon={ FaLock } type="password" label="Senha" placeholder="******" />
        </VStack>
        <Button
          bg="yellow.500"
          padding="25px"
          color="white"
          mt="35px"
          fontSize="xl"
          w="60%"
          _hover={{
            bg: "yellow.300",
          }}
        >
          Logar
        </Button>
        <Text mt="30px" fontSize="lg">
          Ainda não possui conta?{" "}
          <Link as={ DomLink } to="/register" fontSize="md" _hover={ {} } color="gray.400">
            Clique aqui
          </Link>{" "}
        </Text>
      </Flex>
    </Flex>
  );
};
