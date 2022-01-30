import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Logo from "../../assets/paw_heart.svg";
import SignOutIcon from "../../assets/sign-out-alt-solid.svg";

export const Header = () => {
  return (
    <Flex
      w="100vw"
      h="70px"
      bg="yellow.200"
      align="center"
      justifyContent="space-around"
    >
      <Flex fontWeight="bold" align="center">
        <Image src={Logo} width="60px" height="60px" />
        <Heading as="h3" size="md">
          MyPets
        </Heading>
      </Flex>
      <Image src={SignOutIcon} w="40px" h="40px" onClick={() => {}} />
    </Flex>
  );
};
