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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Logo from "../../assets/Logo.svg";
import { Input } from "../../components/Form/Input";

interface FormLoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const schemaLogin = yup.object().shape({
    email: yup
      .string()
      .required("* Campo obrigatório")
      .email("* E-mail Inválido"),
    password: yup.string().required("* Campo obrigatório"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormLoginData>({
    resolver: yupResolver(schemaLogin),
  });

  const hundleLogin = (data: FormLoginData) => {
    console.log(data);
  };

  return (
    <Flex
      as="main"
      w="100%"
      overflowY="auto"
      padding={["25px 5px", "25px 10px", "0"]}
      h={["auto", "auto", "100vh"]}
      flexDirection={["column", "column", "row"]}
      justifyContent="space-evenly"
      align="center"
      bgGradient={[
        "linear(to-t, blue.300 65%, yellow.300 35%)",
        "linear(to-t, blue.300 65%, yellow.300 35%)",
        "linear(to-r, blue.300 65%, yellow.300 35%)",
      ]}
    >
      <Flex
        align="stretch"
        w={["80%", "70%", "30%"]}
        mb={["25px", "25px", "0"]}
        flexDirection={["column", "column", "row"]}
        alignItems="center"
      >
        <Image
          src={Logo}
          mr={["0", "0", "30px"]}
          mb={["25px", "25px", "0"]}
          w={["45px", "45px", "100px"]}
        />
        <Box w={["200px", "200px", "300px"]}>
          <Heading
            as="h1"
            fontSize={["xl", "2xl", "3xl"]}
            color="gray.900"
            mb="20px"
          >
            MyPets
          </Heading>
          <Text color="gray.900" fontSize={["md", "md", "lg"]}>
            Uma maneira fácil e prática para gerenciar seus pets.
          </Text>
        </Box>
      </Flex>
      <Flex
        as="form"
        onSubmit={ handleSubmit(hundleLogin) }
        action="post"
        w={["90%", "70%", "40%", "35%"]}
        bg="white"
        flexDirection="column"
        alignItems="center"
        padding={["20px", "30px", "25px 40px"]}
        borderRadius="10px"
      >
        <Heading as="h1" textAlign="center" mb="20px" fontWeight="normal">
          Login
        </Heading>
        <VStack w="100%" spacing="20px">
          <Input
            Icon={FaUserAlt}
            type="text"
            label="E-mail"
            placeholder="exemplo@exemplo.com"
            error={errors.email}
            {...register("email")}
          />
          <Input
            Icon={FaLock}
            type="password"
            label="Senha"
            placeholder="******"
            error={errors.password}
            {...register("password")}
          />
        </VStack>
        <Button
          type="submit"
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
          <Link
            as={DomLink}
            to="/register"
            fontSize="md"
            _hover={{}}
            color="gray.400"
          >
            Clique aqui
          </Link>{" "}
        </Text>
      </Flex>
    </Flex>
  );
};
