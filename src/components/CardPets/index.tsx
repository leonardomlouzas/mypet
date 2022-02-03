import {
  Flex,
  Image,
  Heading,
  Badge,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { Header } from "../Header";

import { usePets } from "../../contexts/ContextPets";
import { useAuth } from "../../contexts/ContextAuth";

import VenusIcon from "../../assets/venus-solid.svg";
import BgImage from "../../assets/background.png";
interface CardPetProps {
  mobile: boolean;
  open: (
    item: number,
    name: string,
    img: string,
    age: number,
    race: string,
    specie: string
  ) => void;
}

export const CardPets = ({ mobile, open }: CardPetProps) => {
  const { pets, getPets } = usePets();
  const { accessToken, user } = useAuth();

  useEffect(() => {
    getPets(accessToken, user.id);
  }, []);

  return (
    <Box
      w="100vw"
      h="100vh"
      bg={mobile ? "gray.200" : "blue.300"}
      bgImg={mobile ? "" : BgImage}
    >
      <Header />
      <Box w="100%">
        <Flex
          justify="center"
          align="center"
          mt={mobile ? "" : "25px"}
          w="100%"
          minH="400px"
        >
          {pets.map((item, index) => (
            <Flex
              key={index}
              direction={mobile ? "row" : "column"}
              align="center"
              justify="space-evenly"
              borderRadius={mobile ? "0px" : "20px"}
              border={mobile ? "0px" : "1px"}
              w={mobile ? "100%" : "300px"}
              mb={mobile ? "10px" : "0px"}
              mr={mobile ? "0px" : "10px"}
              p="5"
              bg="gray.200"
              onClick={() =>
                open(
                  item.id,
                  item.nome,
                  item.img_url,
                  item.age,
                  item.race,
                  item.specie
                )
              }
              _hover={mobile ? { bg: "blue.300" } : {}}
            >
              <Image
                src={item.img_url}
                alt={item.nome}
                h="90px"
                w="90px"
                borderRadius="50%"
                border="1px"
                borderColor="yellow.200"
                boxShadow="dark-lg"
              />
              <Box>
                <Flex direction="row" mb="15px" mt="15px">
                  <Heading as="h3" size="md">
                    {item.nome}
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
                    {item.specie}
                  </Badge>
                  <Text>{item.age} anos</Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
      {mobile ? (
        <Center w="100%" h="70px" bg="yellow.300" p="5">
          Adicionar Pet
        </Center>
      ) : (
        ""
      )}
    </Box>
  );
};
