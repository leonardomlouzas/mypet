import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Center,
  useDisclosure,
} from "@chakra-ui/react";

import SyringeIcon from "../../assets/syringe-solid.svg";
import BowlIcon from "../../assets/bowl-solid.svg";
import StoreIcon from "../../assets/store-alt-solid.svg";
import UtensilsIcon from "../../assets/utensils-solid.svg";
import BgImage from "../../assets/background.png";
import ArrowIcon from "../../assets/arrow-left-solid.svg";
import EngineIcon from "../../assets/cog-solid.svg";

import { ModalPet } from "../ModalPet";
import { Header } from "../Header";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selected = pets.filter((item) => item.id === petId);

  return (
    //mobileCode
    <>
      <ModalPet
        petId={petId}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      {mobile ? (
        <Box w="100vw" h="100vh" bg={"blue.300"} bgImg={BgImage}>
          <Header />
          <Flex justify="center" mt="25px" p="5">
            <Box
              borderRadius="20px"
              bg="gray.200"
              w="1100px"
              boxShadow="dark-lg"
            >
              <Flex w="100%" mb="15px" borderBottom="1px" p="5">
                <Image
                  src={selected[0].img_url}
                  w="150px"
                  h="200px"
                  borderRadius="20px"
                  mr="25px"
                />
                <Flex w="100%" justify="space-between">
                  <Box>
                    <Flex>
                      <Heading as="h2">{selected[0].nome}</Heading>
                    </Flex>
                    <Heading as="h3" size="24px">
                      Espécie: {selected[0].specie}
                    </Heading>
                    <Heading as="h4" size="18px">
                      Idade: {selected[0].age}
                    </Heading>
                  </Box>
                  <Flex
                    w="10%"
                    direction="column"
                    align="center"
                    justify="space-between"
                    h="100%"
                  >
                    <Image
                      src={ArrowIcon}
                      w="50px"
                      h="40px"
                      onClick={returnToDesktop}
                      _hover={{ cursor: "pointer" }}
                    />
                    <Image
                      src={EngineIcon}
                      w="50px"
                      h="40px"
                      onClick={onOpen}
                      _hover={{ cursor: "pointer" }}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                justify="space-evenly"
                align="center"
                w="100%"
                p="5"
                mt="15px"
                mb="15px"
                wrap="wrap"
                gap="35px"
              >
                <Flex
                  direction="column"
                  fontWeight="bold"
                  bg="yellow.300"
                  borderRadius="20px"
                  w="120px"
                  h="120px"
                  onClick={enterVaccine}
                  _hover={{ bg: "yellow.200" }}
                  align="center"
                  justify="center"
                  boxShadow="lg"
                  flex="1 1 30px"
                >
                  <Image src={SyringeIcon} w="60px" h="60px" />
                  <Text>Vacinas</Text>
                </Flex>
                <Flex
                  direction="column"
                  fontWeight="bold"
                  bg="yellow.300"
                  borderRadius="20px"
                  w="120px"
                  h="120px"
                  onClick={enterPetShop}
                  _hover={{ bg: "yellow.200" }}
                  align="center"
                  justify="center"
                  boxShadow="lg"
                  flex="1 1 30px"
                >
                  <Image src={StoreIcon} w="60px" h="60px" />
                  <Text>Pet Shop</Text>
                </Flex>
                <Flex
                  direction="column"
                  fontWeight="bold"
                  bg="yellow.300"
                  borderRadius="20px"
                  w="120px"
                  h="120px"
                  onClick={enterFeed}
                  _hover={{ bg: "yellow.200" }}
                  align="center"
                  justify="center"
                  boxShadow="lg"
                  flex="1 1 30px"
                >
                  <Image src={BowlIcon} w="60px" h="60px" />
                  <Text>Alimentação</Text>
                </Flex>
                <Flex
                  direction="column"
                  fontWeight="bold"
                  bg="yellow.300"
                  borderRadius="20px"
                  w="120px"
                  h="120px"
                  onClick={enterFood}
                  _hover={{ bg: "yellow.200" }}
                  align="center"
                  justify="center"
                  boxShadow="lg"
                  flex="1 1 30px"
                >
                  <Image src={UtensilsIcon} w="60px" h="60px" />
                  <Text>Estoque</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box w="100vw" bg="gray.200">
          <Flex
            w="100%"
            h="70px"
            bg="blue.300"
            align="center"
            justify="space-between"
            p="5"
          >
            <Heading as="h2" size={mobile ? "32px" : "32px"}>
              {selected[0].nome}
            </Heading>
            <Image
              src={ArrowIcon}
              w="70px"
              h="50px"
              onClick={returnToDesktop}
            />
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
                <Heading as="h2" size={mobile ? "24px" : "16px"}>
                  {selected[0].nome}
                </Heading>
                {/* <Image src={VenusIcon} h="50px" w="50px" /> */}
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

          <Center
            w="100%"
            h="50px"
            bg="yellow.300"
            onClick={onOpen}
            _hover={{ bg: "yellow.200", cursor: "pointer" }}
          >
            <Text>Editar Pet</Text>
          </Center>
        </Box>
      )}
    </>
  );
};
