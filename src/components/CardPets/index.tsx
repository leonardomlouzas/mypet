import {
  Flex,
  Image,
  Heading,
  Badge,
  Text,
  Box,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { Header } from "../Header";

import { usePets } from "../../contexts/ContextPets";
import { useAuth } from "../../contexts/ContextAuth";
import PlusIcon from "../../assets/plus-solid.svg";

import BgImage from "../../assets/background.png";
import { ModalPet } from "../ModalPet";
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

  const selected = pets.filter((item) => item.userId === user.id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getPets(accessToken, user.id);
  }, [isOpen]);

  return (
    <Box
      w="100vw"
      h="100vh"
      bg={mobile ? "gray.200" : "blue.300"}
      bgImg={mobile ? "" : BgImage}
    >
      <ModalPet
        petId={0}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isNew={true}
      />
      <Header />
      <Box w="100%">
        <Flex
          justify="center"
          align="center"
          direction={mobile ? "column" : "row"}
          mt={mobile ? "" : "25px"}
          flexWrap="wrap"
          gap="15px"
          minH="400px"
        >
          {selected.map((item, index) => (
            <Flex
              key={index}
              direction={mobile ? "row" : "column"}
              align="center"
              justify="flex-start"
              borderRadius={mobile ? "0px" : "20px"}
              borderBottom={mobile && pets.length > 1 ? "1px" : "0px"}
              w={mobile ? "100%" : "300px"}
              mb={mobile ? "10px" : "0px"}
              mr={mobile ? "0px" : "10px"}
              p="5"
              bg="gray.200"
              gap="15px"
              boxShadow={mobile ? "" : "dark-lg"}
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
              _hover={mobile ? {} : { bg: "yellow.300", cursor: "pointer" }}
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
                </Flex>
                <Flex
                  direction="column"
                  align="start"
                  justify="start"
                  m="0 auto"
                  w="100%"
                  gap="10px"
                >
                  <Badge bg="yellow.200" mb="5px">
                    {item.specie}
                  </Badge>
                  <Text>Idade: {item.age} anos</Text>
                </Flex>
              </Box>
            </Flex>
          ))}
          {mobile ? (
            pets.length === 0 ? (
              <>
                <Flex w="100vw" h="100%" bg="gray.200" justify="center">
                  <Text align="center" fontWeight="bold">
                    Sem pets
                    <br />
                    Adicione algum
                  </Text>
                </Flex>
              </>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {!mobile && (
            <Flex
              w="100%"
              direction="column"
              align="center"
              justify="center"
              p="8"
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={onOpen}
            >
              <Image
                src={PlusIcon}
                alt="Adicionar"
                w="80px"
                h="50px"
                color="yellow.300"
              />
              <Text fontWeight="bold" align="center">
                Adicione seu amigo
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>
      {mobile ? (
        <Flex align="center" justifyContent="center">
          <Center
            w="50%"
            h="70px"
            bg="yellow.300"
            p="5"
            borderRadius="15px"
            _hover={{ bg: "yellow.200", cursor: "pointer" }}
            fontWeight="bold"
            onClick={onOpen}
          >
            Adicionar Pet
          </Center>
        </Flex>
      ) : (
        ""
      )}
    </Box>
  );
};
