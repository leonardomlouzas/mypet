import { Flex, Image, Text } from "@chakra-ui/react";
import Bowl from "../../assets/bowl-solid.svg";

interface FeedProps {
  frequency: string;
  time: number;
}
export const CardFeed = ({ frequency, time }: FeedProps) => {
  return (
    <Flex backgroundColor="white" width="100%" padding="15px" gap="15px">
      <Image src={Bowl} />
      <Flex flexDirection="column">
        <Text fontWeight="bold">{frequency}</Text>
        <Text>{time}</Text>
      </Flex>
    </Flex>
  );
};
