import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import PetShopIcon from "../../assets/store-alt-solid.svg";
import ArrowIcon from "../../assets/arrow-left-solid.svg";
import BgImage from "../../assets/background.png";
import { Header } from "../Header";
import { usePetShop } from "../../contexts/ContextPetShop";
import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";
import { useEffect } from "react";

import { ModalPetshop } from "../ModalPetShop";

interface PetShopProps {
  petName: string;
  petId: number;
  mobile: boolean;
  closePetShop: () => void;
}

export const CardPetshop = ({
  petName,
  petId,
  mobile,
  closePetShop,
}: PetShopProps) => {
  const { petShop, getPetShop } = usePetShop();
  const { accessToken } = useAuth();
  const { pets } = usePets();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selected = pets.filter((item) => item.id === petId);

  useEffect(() => {
    getPetShop(accessToken);
  });
  return (
    <>
      {mobile ? (
        <Box w="100vw" h="100vh" bg="blue.300" bgImg={BgImage}>
          <ModalPetshop
            petId={petId}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
          <Header />
          <Flex justify="center" w="100%" mt="25px">
            <Flex
              p="5"
              direction="column"
              bg="white"
              borderRadius="20px"
              w="600px"
            >
              <Flex borderBottom="1px" pb="15px">
                <Image
                  src={selected[0].img_url}
                  alt={selected[0].nome}
                  w="150px"
                  h="200px"
                  mr="15px"
                  borderRadius="20px"
                />
                <Flex justify="space-between" w="100%">
                  <Box>
                    <Heading as="h3">{selected[0].nome}</Heading>
                    <Text>{selected[0].specie}</Text>
                    <Text>{selected[0].age}</Text>
                  </Box>
                  <Box>
                    <Image
                      src={ArrowIcon}
                      w="50px"
                      h="30px"
                      onClick={closePetShop}
                    />
                  </Box>
                </Flex>
              </Flex>
              <Flex
                bg="gray.300"
                borderRadius="15px"
                w="80%"
                align="center"
                justify="center"
                m="0 auto"
                mt="15px"
              >
                {petShop.map((item, index) => (
                  <Flex
                    key={index}
                    direction="row"
                    p="5"
                    w="100%"
                    justify="space-evenly"
                    onClick={onOpen}
                  >
                    <Image src={PetShopIcon} w="35px" h="35px" mr="15px" />
                    <Box>
                      <Heading as="h3" size="24px">
                        {item.service}
                      </Heading>
                      <Text>{item.date}</Text>
                      <Text>{item.price}</Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <>
          <ModalPetshop
            petId={petId}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
          <Box w="100vw" h="100vh">
            <Flex
              align="center"
              justify="space-between"
              bg="blue.300"
              w="100%"
              h="70px"
            >
              <Heading as="h2">{petName}</Heading>
              <Image src={ArrowIcon} w="50px" h="30px" onClick={closePetShop} />
            </Flex>
            <Box bg="gray.200" w="100%" minH="400px">
              {petShop.map((item, index) => (
                <Flex
                  key={index}
                  direction="row"
                  p="5"
                  borderBottom="1px"
                  w="100%"
                  onClick={onOpen}
                >
                  <Image src={PetShopIcon} w="35px" h="35px" mr="15px" />
                  <Box>
                    <Heading as="h3">{item.service}</Heading>
                    <Text>{item.date}</Text>
                    <Text>{item.price}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Center w="100%" h="70px" bg="yellow.300" p="5">
              <Heading as="h4">Adicionar Serviço</Heading>
            </Center>
          </Box>
        </>
      )}
    </>
  );
};
