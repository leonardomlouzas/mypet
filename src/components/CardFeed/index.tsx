import { Flex, Image } from "@chakra-ui/react";
import Bowl from "../../assets/bowl-solid.svg";

export const CardFeed = () => {
  return (
    <Flex
      backgroundColor="red"
      width="100%"
      padding="15px"
      justifyContent="space-around"
    >
      <Image src={Bowl} />
      <Flex flexDirection="column">
        <p>Frequência</p>
        <p>Horário</p>
      </Flex>
      <p>Vezes/Dia</p>
    </Flex>
  );
};
