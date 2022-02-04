import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Utensils from "../../assets/utensils-solid.svg";
import ArrowIcon from "../../assets/arrow-left-solid.svg";
import BgImage from "../../assets/background.png";
import PlusIcon from "../../assets/plus-solid.svg";
import { Header } from "../Header";
import { useFood } from "../../contexts/ContextFood";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";
import { ModalFood } from "../ModalFood";

interface FeedProps {
  petName: string;
  petId: number;
  mobile: boolean;
  closeFood: () => void;
}
export const CardFood = ({ petName, petId, mobile, closeFood }: FeedProps) => {
  const { accessToken, user } = useAuth();
  const { pets } = usePets();
  const { food, getFood } = useFood();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [foodId, setFoodId] = useState(0);

  const [isNew, setIsNew] = useState(false);

  const selected = pets.filter((item) => item.id === petId);
  const selectedFood = food.filter((item) => item.userId === user.id);

  useEffect(() => {
    getFood(user.id, petId, accessToken);
  }, [isOpen]);

  const handler = (id: number, state: boolean) => {
    if (state) {
      setIsNew(true);
      onOpen();
    } else {
      setIsNew(false);
      setFoodId(id);
      onOpen();
    }
  };

  return (
    <>
      <ModalFood
        foodId={foodId}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        isNew={isNew}
        petid={petId}
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
                  <Flex
                    direction="column"
                    align="center"
                    justify="space-between"
                  >
                    <Image
                      src={ArrowIcon}
                      w="50px"
                      h="30px"
                      onClick={closeFood}
                      _hover={{ cursor: "pointer" }}
                    />
                    <Image
                      src={PlusIcon}
                      w="50px"
                      h="30px"
                      onClick={() => handler(0, true)}
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
                {selectedFood.map((item, index) => (
                  <Flex
                    key={index}
                    direction="row"
                    p="5"
                    w="100%"
                    align="center"
                    justify="flex-start"
                    borderRadius="15px"
                    bg="gray.300"
                    onClick={() => handler(item.id, false)}
                    _hover={{
                      borderRadius: "15px",
                      bg: "blue.300",
                      cursor: "pointer",
                    }}
                  >
                    <Image src={Utensils} w="35px" h="35px" mr="15px" />
                    <Flex
                      w="100%"
                      justify="space-between"
                      align="center"
                      gap="15px"
                    >
                      <Box>
                        <Heading as="h3" size="24px">
                          {item.item?.toUpperCase()}
                        </Heading>
                        <Text>Quant: {item.quantity}</Text>
                      </Box>
                      <Box>
                        <Text>R$ {item.price}</Text>
                        <Text>Freq: {item.frequency}</Text>
                      </Box>
                    </Flex>
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
              <Image src={ArrowIcon} w="30px" h="30px" onClick={closeFood} />
            </Flex>
            <Box bg="gray.200" w="100%" minH="400px">
              {selectedFood.map((item, index) => (
                <Flex
                  key={index}
                  direction="row"
                  align="center"
                  justify="flex-start"
                  p="5"
                  borderBottom="1px"
                  w="100%"
                  onClick={() => handler(item.id, false)}
                >
                  <Image src={Utensils} w="35px" h="35px" mr="15px" />
                  <Box>
                    <Heading as="h3" size="16px">
                      {item.item}
                    </Heading>
                    <Text>Quant:{item.quantity}</Text>
                    <Text>R$ {item.price}</Text>
                    <Text>Freq: {item.frequency}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Center
              w="100%"
              h="70px"
              bg="yellow.300"
              p="5"
              onClick={() => handler(0, true)}
              _hover={{ bg: "yellow.200" }}
            >
              <Heading as="h4" size="md">
                Adicionar Comida
              </Heading>
            </Center>
          </Box>
        </>
      )}
    </>
  );
};
