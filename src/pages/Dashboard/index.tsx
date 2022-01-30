import { Header } from "../../components/Header";
import { CardPets } from "../../components/CardPets";
import { Box } from "@chakra-ui/react";
import BgImage from "../../assets/background.png";

import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";

import { useEffect } from "react";

export const Dashboard = () => {
  const { accessToken, user } = useAuth();
  const { pets, getPets } = usePets();

  const myPets = pets.filter((item) => item.userId === user.id);

  useEffect(() => {
    getPets(accessToken);
  }, []);

  console.log(myPets);

  return (
    <Box bg="blue.200" bgImage={BgImage} w="100vw" h="100vh">
      <Header />
      {myPets.map((pet, index) => {
        <CardPets
          key={index}
          petImage={pet.image_url}
          petName={pet.name}
          petSpecie={pet.specie}
          petAge={pet.age}
        />;
      })}
    </Box>
  );
};
