import { Header } from "../../components/Header";
import { CardPets } from "../../components/CardPets";
import { Box, Flex } from "@chakra-ui/react";
import BgImage from "../../assets/background.png";

import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";

import { useEffect, useState } from "react";

import { CardPetOpen } from "../../components/CardPetOpen";

export const Dashboard = () => {
  const [openCard, setOpenCard] = useState(false);

  const { accessToken, user } = useAuth();
  const { pets, selectedPet, setSelectedPet, getPets } = usePets();

  useEffect(() => {
    getPets(accessToken, user.id);
  }, []);

  const handler = (petId: number) => {
    setSelectedPet(pets.filter((item) => item.id === petId));
    setOpenCard(true);
  };

  return (
    <Box bg="blue.200" bgImage={BgImage} w="100vw" h="100vh">
      <Header />
      <Flex align="center" justify="center" mt="5">
        {openCard ? (
          <CardPetOpen
            petImage={selectedPet[0].img_url}
            petName={selectedPet[0].nome}
            petSpecie={selectedPet[0].specie}
            petAge={selectedPet[0].age}
            func={() => setOpenCard(false)}
          />
        ) : (
          pets.map((pet, index) => (
            <CardPets
              key={index}
              petImage={pet.img_url}
              petName={pet.nome}
              petSpecie={pet.specie}
              petAge={pet.age}
            />
          ))
        )}
      </Flex>
      <button onClick={() => handler(1)}>Entrar</button>
    </Box>
  );
};
