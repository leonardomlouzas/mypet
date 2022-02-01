import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

import VenusIcon from "../../assets/venus-solid.svg";
import SyringeIcon from "../../assets/syringe-solid.svg";
import BowlIcon from "../../assets/bowl-solid.svg";
import StoreIcon from "../../assets/store-alt-solid.svg";
import UtensilsIcon from "../../assets/utensils-solid.svg";

import ArrowIcon from "../../assets/arrow-left-solid.svg";

import { CardVaccine } from "../CardVaccine";
import { CardPetshop } from "../CardPetShop";
import { CardFeed } from "../CardFeed";
import { CardFood } from "../Food";

import { usePets } from "../../contexts/ContextPets";
import { useVaccine } from "../../contexts/ContextVaccines";
import { usePetShop } from "../../contexts/ContextPetShop";
import { useFood } from "../../contexts/ContextFood";

interface CardPetOpenProps {
  petImage: string;
  petName: string;
  petSpecie: string;
  petAge: number;
  func: () => void;
}

export const CardPetOpen = ({
  petImage,
  petName,
  petSpecie,
  petAge,
  func,
}: CardPetOpenProps) => {
  return (
    //mobileCode
    <Box w="320px" bg="gray.200">
      <Flex
        w="100%"
        h="70px"
        bg="blue.300"
        align="center"
        justify="space-between"
        p="5"
      >
        <Heading as="h2">{petName}</Heading>
        <Image src={ArrowIcon} w="70px" h="50px" onClick={func} />
      </Flex>

      <Flex w="100%" bg="gray.200" p="5" mb="15px" borderBottom="1px">
        <Image
          src={petImage}
          w="100px"
          h="100px"
          borderRadius="20px"
          mr="15px"
          alt={petName}
        />
        <Box>
          <Flex>
            <Heading as="h2">{petName}</Heading>
            <Image src={VenusIcon} h="50px" w="50px" />
          </Flex>
          <Badge bg="yellow.300">{petSpecie}</Badge>
          <Text>Idage: {petAge} anos</Text>
        </Box>
      </Flex>
      <Flex direction="column" justify="center" align="center">
        <Flex
          mb="15px"
          p="3"
          w="150px"
          borderRadius="10px"
          bg="yellow.300"
          _hover={{ bg: "yellow.200" }}
          align="center"
          justify="center"
          direction="column"
        >
          <Image src={SyringeIcon} w="35px" h="35px" m="0 auto" />
          <Text>Medicamentos</Text>
        </Flex>
        <Flex
          mb="15px"
          p="3"
          w="150px"
          borderRadius="10px"
          bg="yellow.300"
          _hover={{ bg: "yellow.200" }}
          align="center"
          justify="center"
          direction="column"
        >
          <Image src={UtensilsIcon} w="35px" h="35px" m="0 auto" />
          <Text>Pet Shop</Text>
        </Flex>
        <Flex
          mb="15px"
          p="3"
          w="150px"
          borderRadius="10px"
          bg="yellow.300"
          _hover={{ bg: "yellow.200" }}
          align="center"
          justify="center"
          direction="column"
        >
          <Image src={BowlIcon} w="35px" h="35px" m="0 auto" />
          <Text>Alimentação</Text>
        </Flex>
        <Flex
          mb="15px"
          p="3"
          w="150px"
          borderRadius="10px"
          bg="yellow.300"
          _hover={{ bg: "yellow.200" }}
          align="center"
          justify="center"
          direction="column"
        >
          <Image src={StoreIcon} w="35px" h="35px" m="0 auto" />
          <Text>Estoque</Text>
        </Flex>
      </Flex>
      <Center w="100%" h="50px" bg="yellow.300">
        <Text>Editar</Text>
      </Center>
    </Box>
  );
};
