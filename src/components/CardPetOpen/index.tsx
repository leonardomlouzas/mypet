import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Center,
} from "@chakra-ui/react";

import VenusIcon from "../../assets/venus-solid.svg";
import SyringeIcon from "../../assets/syringe-solid.svg";
import BowlIcon from "../../assets/bowl-solid.svg";
import StoreIcon from "../../assets/store-alt-solid.svg";
import UtensilsIcon from "../../assets/utensils-solid.svg";

import ArrowIcon from "../../assets/arrow-left-solid.svg";

import { usePets } from "../../contexts/ContextPets";

interface CardPetOpenProps {
  petId: number;
  mobile: boolean;
  returnToDesktop: () => void;
  enterVaccine: () => void;
  enterPetShop: () => void;
  enterFeed: () => void;
  enterFood: () => void;
}

export const CardPetOpen = ({
  petId,
  mobile,
  returnToDesktop,
  enterVaccine,
  enterPetShop,
  enterFeed,
  enterFood,
}: CardPetOpenProps) => {
  const { pets } = usePets();

  const selected = pets.filter((item) => item.id === petId);

  return (
    //mobileCode
    <Box w="320px" bg="gray.200">
      <Flex
        w="100%"
        h="70px"
        bg="blue.300"
        align="center"
        justify="space-between"
        p="5"
      >
        <Heading as="h2">{selected[0].nome}</Heading>
        <Image src={ArrowIcon} w="70px" h="50px" onClick={returnToDesktop} />
      </Flex>

      <Flex w="100%" bg="gray.200" p="5" mb="15px" borderBottom="1px">
        <Image
          src={selected[0].img_url}
          w="100px"
          h="100px"
          borderRadius="20px"
          mr="15px"
          alt={selected[0].nome}
        />
        <Box>
          <Flex>
            <Heading as="h2">{selected[0].nome}</Heading>
            <Image src={VenusIcon} h="50px" w="50px" />
          </Flex>
          <Badge bg="yellow.300">{selected[0].specie}</Badge>
          <Text>Idade: {selected[0].age} anos</Text>
        </Box>
      </Flex>
      <Flex direction="column" justify="center" align="center">
        <Flex
          mb="15px"
          p="3"
          w="150px"
          borderRadius="10px"
          bg="yellow.300"
          _hover={{ bg: "yellow.200", cursor: "pointer" }}
          align="center"
          justify="center"
          direction="column"
          onClick={enterVaccine}
        >
          <Image src={SyringeIcon} w="35px" h="35px" m="0 auto" />
          <Text>Medicamentos</Text>
        </Flex>
        <Flex
          mb="15px"
          p="3"
          w="150px"
          borderRadius="10px"
          bg="yellow.300"
          _hover={{ bg: "yellow.200", cursor: "pointer" }}
          align="center"
          justify="center"
          direction="column"
          onClick={enterPetShop}
        >
          <Image src={UtensilsIcon} w="35px" h="35px" m="0 auto" />
          <Text>Pet Shop</Text>
        </Flex>
        <Flex
          mb="15px"
          p="3"
          w="150px"
          borderRadius="10px"
          bg="yellow.300"
          _hover={{ bg: "yellow.200", cursor: "pointer" }}
          align="center"
          justify="center"
          direction="column"
          onClick={enterFeed}
        >
          <Image src={BowlIcon} w="35px" h="35px" m="0 auto" />
          <Text>Alimentação</Text>
        </Flex>
        <Flex
          mb="15px"
          p="3"
          w="150px"
          borderRadius="10px"
          bg="yellow.300"
          _hover={{ bg: "yellow.200", cursor: "pointer" }}
          align="center"
          justify="center"
          direction="column"
          onClick={enterFood}
        >
          <Image src={StoreIcon} w="35px" h="35px" m="0 auto" />
          <Text>Estoque</Text>
        </Flex>
      </Flex>
      {mobile ? (
        ""
      ) : (
        <Center
          w="100%"
          h="50px"
          bg="yellow.300"
          onClick={() => console.log("Editar Pet")}
          _hover={{ bg: "yellow.200", cursor: "pointer" }}
        >
          <Text>Editar Pet</Text>
        </Center>
      )}
    </Box>
  );
};
