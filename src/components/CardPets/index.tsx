import { Flex, Image, Heading, Badge, Text } from "@chakra-ui/react";
import { Botao } from "../Button";
import VenusIcon from "../../assets/venus-solid.svg";
import MarsIcon from "../../assets/mars-solid.svg";

interface CardPetProps {
  petImage: string;
  petName: string;
  petSpecie: string;
  petAge: number;
}

export const CardPets = ({
  petImage,
  petName,
  petSpecie,
  petAge,
}: CardPetProps) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      borderRadius="20px"
      border="1px"
      w="200px"
      m="10px"
      p="5"
      bg="gray.200"
    >
      <Image
        src={petImage}
        alt={petName}
        h="90px"
        w="90px"
        borderRadius="50%"
        border="1px"
        borderColor="yellow.200"
      />
      <Flex mb="15px" mt="15px">
        <Heading as="h3" size="md">
          {petName}
        </Heading>
        <Image src={VenusIcon} w="30px" h="30px" />
      </Flex>
      <Flex
        direction="column"
        align="start"
        justify="center"
        mb="15px"
        w="100%"
      >
        <Badge bg="yellow.200" mb="5px">
          {petSpecie}
        </Badge>
        <Text>{petAge} anos</Text>
      </Flex>
      <Botao content="Entrar" />
    </Flex>
  );
};
