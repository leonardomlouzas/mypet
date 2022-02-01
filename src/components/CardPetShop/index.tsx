import { Flex, Image, Text } from "@chakra-ui/react";
import Syringe from "../../assets/syringe-solid.svg";

interface PetShopProps {
  service: string;
  frequency: string;
  date: Date;
  price: number;
}

export const CardPetshop = ({
  service,
  frequency,
  date,
  price,
}: PetShopProps) => {
  return (
    <Flex
      backgroundColor="white"
      width="100%"
      padding="15px"
      gap="15px"
      flexDirection="row"
      justifyContent="space-around"
    >
      <Image src={Syringe} w="30px" />
      <Flex flexDirection="column" textAlign="center">
        <Text fontWeight="bold">{service}</Text>
        <Text>{frequency}</Text>
      </Flex>
      <Flex flexDirection="column" textAlign="center">
        <Text>{date}</Text>
        <Text>{price}</Text>
      </Flex>
    </Flex>
  );
};
