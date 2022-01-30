import { Flex, Image, Heading, Badge, Text } from "@chakra-ui/react";
import { Botao } from "../Button";

interface CardPetProps {
  petImage: string;
  petName: string;
  petSpecie: string;
  petAge: number;
}

export const CardPet = ({
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
      <Flex>
        <Heading as="h3" size="md">
          {petName}Icon
        </Heading>
      </Flex>
      <Flex direction="column" align="left" justify="left">
        <Badge bg="yellow.200">{petSpecie}</Badge>
        <Text>{petAge}</Text>
        <Botao content="Entrar" />
      </Flex>
    </Flex>
  );
};
