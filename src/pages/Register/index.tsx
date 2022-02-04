import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as DomLink } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

import Logo from "../../assets/Logo.svg";
import { Input } from "../../components/Form/Input";

import { useAuth } from "../../contexts/ContextAuth";

interface FormRegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const Register = () => {
  const { registerUser } = useAuth();

  const schemaRegister = yup.object().shape({
    name: yup.string().required("* Campo obrigatório"),
    email: yup
      .string()
      .required("* Campo obrigatório")
      .email("* E-mail Inválido"),
    password: yup.string().required("* Campo obrigatório").min(6),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormRegisterData>({
    resolver: yupResolver(schemaRegister),
  });

  const hundleRegister = (data: FormRegisterData) => {
    registerUser(data);
  };

  return (
    <Flex
      as="main"
      w="100%"
      minH="100vh"
      padding={["25px 5px", "25px 10px", "20px 0"]}
      flexDirection={["column", "column", "row"]}
      justifyContent="space-evenly"
      alignItems="center"
      bgGradient={[
        "linear(to-b, blue.300 65%, yellow.300 35%)",
        "linear(to-b, blue.300 65%, yellow.300 35%)",
        "linear(to-r, blue.300 65%, yellow.300 35%)",
      ]}
    >
      <Flex
        w={["80%", "70%", "40%", "30%"]}
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
        onSubmit={handleSubmit(hundleRegister)}
        action="post"
        w={["90%", "70%", "45%", "35%"]}
        bg="white"
        flexDirection="column"
        alignItems="center"
        padding={["20px", "30px", "25px 40px"]}
        borderRadius="10px"
      >
        <Heading as="h1" textAlign="center" mb="20px" fontWeight="normal">
          Registro
        </Heading>
        <VStack w="100%" spacing="20px">
          <Input
            Icon={FaUserAlt}
            type="text"
            label="Nome"
            placeholder="Digite o nome"
            error={errors.name}
            {...register("name")}
          />
          <Input
            Icon={FaUserAlt}
            type="email"
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
          <Input
            Icon={FaLock}
            type="password"
            label="Confirme a Senha"
            placeholder="******"
            error={errors.confirm_password}
            {...register("confirm_password")}
          />
        </VStack>
        <Button
          type="submit"
          bg="blue.300"
          padding="25px"
          color="white"
          mt="35px"
          fontSize="xl"
          w="60%"
          _hover={{
            bg: "blue.500",
          }}
        >
          Cadastrar
        </Button>
        <Text mt="15px" fontSize="lg">
          Já possui conta?{" "}
          <Link
            as={DomLink}
            to="/"
            fontSize="md"
            _hover={{ color: "yellow.500" }}
            color="gray.400"
          >
            Clique aqui
          </Link>{" "}
        </Text>
      </Flex>
    </Flex>
  );
};
