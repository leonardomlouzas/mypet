import { Header } from "../../components/Header";
import { CardPets } from "../../components/CardPets";
import { Box, Flex } from "@chakra-ui/react";
import BgImage from "../../assets/background.png";

import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";

import { useEffect } from "react";

export const Dashboard = () => {
  const { accessToken, user } = useAuth();
  const { pets, getPets } = usePets();

  useEffect(() => {
    getPets(accessToken, user.id);
  }, []);

  return (
    <Box bg="blue.200" bgImage={BgImage} w="100vw" h="100vh">
      <Header />
      <Flex align="center" justify="center" mt="5">
        {pets.map((pet, index) => (
          <CardPets
            key={ index }
            pet={ pet }
          />
        ))}
      </Flex>
    </Box>
  );
};
