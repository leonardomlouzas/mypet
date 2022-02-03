import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Center,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import PetShopIcon from "../../assets/store-alt-solid.svg";
import ArrowIcon from "../../assets/arrow-left-solid.svg";
import BgImage from "../../assets/background.png";
import PlusIcon from "../../assets/plus-solid.svg";
import { Header } from "../Header";
import { usePetShop } from "../../contexts/ContextPetShop";
import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";
import { useEffect, useState } from "react";

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
  const [petShopId, setPetShopId] = useState(0);

  const selected = pets.filter((item) => item.id === petId);
  const selectedPetShop = petShop.filter((item) => item.idPet === petId);

  useEffect(() => {
    getPetShop(accessToken);
  });

  const handle = (id: number) => {
    console.log(id);
    setPetShopId(id);
    onOpen();
  };
  return (
    <>
      <ModalPetshop
        petShopId={petShopId}
        petId={petId}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      {mobile ? (
        <Box w="100vw" h="100vh" bg="blue.300" bgImg={BgImage}>
          <Header />
          <Flex justify="center" w="100%" mt="25px">
            <Flex
              p="5"
              direction="column"
              bg="white"
              borderRadius="20px"
              w="600px"
              mt="25px"
              boxShadow="dark-lg"
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
                    <Heading as="h3">{selected[0].nome.toUpperCase()}</Heading>
                    <Badge bg="yellow.300">{selected[0].specie}</Badge>
                    <Text>Idade: {selected[0].age}</Text>
                  </Box>
                  <Flex direction="column" justify="space-between">
                    <Image
                      src={ArrowIcon}
                      w="50px"
                      h="30px"
                      onClick={closePetShop}
                      _hover={{ cursor: "pointer" }}
                    />
                    <Image
                      src={PlusIcon}
                      w="50px"
                      h="30px"
                      onClick={() => console.log("abrir modal")}
                      _hover={{ cursor: "pointer" }}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                w="80%"
                direction="column"
                align="center"
                justify="center"
                m="0 auto"
                mt="15px"
                gap="15px"
              >
                {selectedPetShop.map((item, index) => (
                  <Flex
                    key={index}
                    direction="row"
                    p="5"
                    w="100%"
                    align="center"
                    justify="flex-start"
                    onClick={() => handle(item.id)}
                    borderRadius="15px"
                    bg="gray.300"
                    _hover={{
                      borderRadius: "15px",
                      bg: "blue.300",
                      cursor: "pointer",
                    }}
                  >
                    <Image src={PetShopIcon} w="35px" h="35px" mr="15px" />
                    <Box>
                      <Heading as="h3" size="24px">
                        {item.service}
                      </Heading>
                      <Text>Data: {item.date}</Text>
                      <Text>R$ {item.price}</Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <>
          <Box w="100vw" h="100vh">
            <Flex
              align="center"
              justify="space-between"
              bg="blue.300"
              w="100%"
              h="70px"
              p="5"
            >
              <Heading as="h2" size="32px">
                {petName.toUpperCase()}
              </Heading>
              <Image src={ArrowIcon} w="30px" h="30px" onClick={closePetShop} />
            </Flex>
            <Box bg="gray.200" w="100%" minH="400px">
              {selectedPetShop.map((item, index) => (
                <Flex
                  key={index}
                  direction="row"
                  align="center"
                  justify="flex-start"
                  p="5"
                  borderBottom="1px"
                  w="100%"
                  onClick={onOpen}
                >
                  <Image src={PetShopIcon} w="35px" h="35px" mr="15px" />
                  <Box>
                    <Heading as="h3" size="16px">
                      {item.service}
                    </Heading>
                    <Text>{item.date}</Text>
                    <Text>Valor: R$ {item.price},00</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Center w="100%" h="70px" bg="yellow.300" p="5">
              <Heading as="h4" size="md">
                Adicionar Serviço
              </Heading>
            </Center>
          </Box>
        </>
      )}
    </>
  );
};
