import { Flex, Image, Heading, Badge, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { Botao } from "../Button";
import VenusIcon from "../../assets/venus-solid.svg";
import MarsIcon from "../../assets/mars-solid.svg";

interface CardPetProps {
  pet: Pets;
}
interface Feed {
  frequency?: string;
  time?: number;
}
interface Pets {
  img_url: string;
  nome: string;
  specie: string;
  race: string;
  age: number;
  userId: number;
  feed?: Feed;
  id: number;
}



export const CardPets = ({ pet }: CardPetProps) => {
  const history = useHistory();

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
        src={ pet.img_url }
        alt={ pet.nome }
        h="90px"
        w="90px"
        borderRadius="50%"
        border="1px"
        borderColor="yellow.200"
      />
      <Flex mb="15px" mt="15px">
        <Heading as="h3" size="md">
          { pet.nome }
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
          { pet.specie }
        </Badge>
        <Text>{ pet.age } anos</Text>
      </Flex>
      <Botao
        content="Entrar"
        onClick={() => {
          history.push(`/pet/${ pet.id }`);
        }}
      />
    </Flex>
  );
};
