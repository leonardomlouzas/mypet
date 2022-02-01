import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import BgImage from "../../assets/background.png";
import { Header } from "../../components/Header";
import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";
import VenusIcon from "../../assets/venus-solid.svg";
import VaccineIcon from "../../assets/syringe-solid.svg";
import PetShopIcon from "../../assets/store-alt-solid.svg";
import BowlIcon from "../../assets/bowl-solid.svg";
import UtensilsIcon from "../../assets/utensils-solid.svg";

interface useParamsProps {
  id?: number;
}

export const Pet = () => {
  const { pet, getPet } = usePets();
  const { accessToken } = useAuth();

  const { id } = useParams() as useParamsProps;
  const history = useHistory();

  useEffect(() => {
    if (id) {
      getPet(id, accessToken).catch(() => {
        history.push("/dashboard");
      });
    } else {
      history.push("/dashboard");
    }
  }, []);

  return (
    <Box bg="blue.200" bgImage={BgImage} w="100%" minH="100vh">
      <Header />
      <Flex
        w="100%"
        minH={["87vh", "87vh", "90vh"]}
        justifyContent={["stretch", "stretch", "center"]}
        alignItems={["stretch", "stretch", "center"]}
      >
        <Box w={["100%", "100%", "60%"]} bgColor="gray.200">
          <Flex
            w="100%"
            justifyContent={["space-evenly", "space-evenly", "start"]}
            alignItems="center"
            padding="25px"
            borderBottom="3px solid"
            borderBottomColor="gray.400"
            position="relative"
          >
            <Center
              position="absolute"
              top="10px"
              right="10px"
              fontSize="3xl"
              cursor="pointer"
              onClick={ () => {
                history.push("/dashboard");
              }}
            >
              <FaArrowAltCircleLeft />
            </Center>
            <Image
              src={pet.img_url}
              w={["100px", "100px", "150px"]}
              h={["100px", "100px", "200px"]}
              mr="60px"
              borderRadius="25px"
            />
            <Box>
              <VStack spacing={["5px", "5px", "15px"]} alignItems="flex-start">
                <Flex>
                  <Heading as="h3" size="md">
                    {pet.nome}
                  </Heading>
                  <Image src={VenusIcon} w="30px" h="30px" />
                </Flex>
                <Heading as="h2" fontSize="xl">
                  {pet.race}
                </Heading>
                <Text fontSize="lg">
                  <b>Idade: </b> {pet.age} anos
                </Text>
              </VStack>
            </Box>
          </Flex>
          <VStack
            w="100%"
            justifyContent="space-evenly"
            alignItems="center"
            flexDirection={["column", "column", "row"]}
            padding="30px"
            spacing={["20px", "20px", "0"]}
          >
            <Center flexDirection="column" cursor="pointer">
              <Center
                as="figure"
                padding="20px 15px"
                bg="yellow.300"
                borderRadius="10px"
                mb="15px"
              >
                <Image src={VaccineIcon} w="50px" />
              </Center>
              <Text fontSize="md">Vacinas</Text>
            </Center>
            <Center flexDirection="column" cursor="pointer">
              <Center
                as="figure"
                padding="20px 15px"
                bg="yellow.300"
                borderRadius="10px"
                mb="15px"
              >
                <Image src={PetShopIcon} w="50px" />
              </Center>
              <Text fontSize="md">Pet Shop</Text>
            </Center>
            <Center flexDirection="column" cursor="pointer">
              <Center
                as="figure"
                padding="20px 15px"
                bg="yellow.300"
                borderRadius="10px"
                mb="15px"
              >
                <Image src={BowlIcon} w="50px" />
              </Center>
              <Text fontSize="md">Alimentação</Text>
            </Center>
            <Center flexDirection="column" cursor="pointer">
              <Center
                as="figure"
                padding="20px 15px"
                bg="yellow.300"
                borderRadius="10px"
                mb="15px"
              >
                <Image src={UtensilsIcon} w="50px" />
              </Center>
              <Text fontSize="md">Estoque</Text>
            </Center>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};
