import { Flex, Image, Text } from "@chakra-ui/react";
import Utensils from "../../assets/utensils-solid.svg";

interface FeedProps {
  item: string;
  frequency: string;
  quantity: string;
  price: string;
}
export const CardFood = ({ item, frequency, quantity, price }: FeedProps) => {
  return (
    <Flex
      backgroundColor="white"
      width="100%"
      padding="15px"
      gap="15px"
      flexDirection="row"
      justifyContent="space-around"
    >
      <Image src={Utensils} w="30px" />
      <Flex flexDirection="column" textAlign="center">
        <Text fontWeight="bold">{item}</Text>
        <Text>{frequency}</Text>
      </Flex>
      <Flex flexDirection="column">
        <Text>{quantity}</Text>
        <Text>{price}</Text>
      </Flex>
    </Flex>
  );
};
