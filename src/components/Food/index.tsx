import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Utensils from "../../assets/utensils-solid.svg";
import ArrowIcon from "../../assets/arrow-left-solid.svg";
import BgImage from "../../assets/background.png";
import { Header } from "../Header";
import { useFood } from "../../contexts/ContextFood";
import { useEffect } from "react";
import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";

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

  const selected = pets.filter((item) => item.id === petId);

  useEffect(() => {
    console.log(accessToken);
    getFood(accessToken);
  }, []);
  return (
    <>
      {mobile ? (
        <Box w="100vw" h="100vh">
          <Header />
          <Flex
            bg="blue.300"
            bgImg={BgImage}
            align="center"
            justify="center"
            w="100%"
            h="100%"
          >
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
                      onClick={closeFood}
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
                {food
                  .filter((item) => item.userId === user.id)
                  .map((item, index) => (
                    <Flex
                      key={index}
                      direction="row"
                      p="5"
                      w="100%"
                      justify="space-evenly"
                    >
                      <Image src={Utensils} w="35px" h="35px" mr="15px" />
                      <Box>
                        <Heading as="h3" size="24px">
                          {item.item}
                        </Heading>
                        <Text>{item.quantity}</Text>
                      </Box>
                      <Box>
                        <Text>R$ {item.price}</Text>
                        <Text>{item.frequency}</Text>
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
            >
              <Heading as="h2">{petName}</Heading>
              <Image src={ArrowIcon} w="50px" h="30px" onClick={closeFood} />
            </Flex>

            {food
              .filter((item) => item.userId === user.id)
              .map((item, index) => (
                <Flex
                  key={index}
                  direction="row"
                  p="5"
                  borderBottom="1px"
                  w="100%"
                >
                  <Image src={Utensils} w="35px" h="35px" mr="15px" />
                  <Box>
                    <Heading as="h3">{item.item}</Heading>
                    <Text>{item.quantity}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.frequency}</Text>
                  </Box>
                </Flex>
              ))}
            <Center w="100%" h="70px" bg="yellow.300" p="5">
              <Heading as="h4">Adicionar Serviço</Heading>
            </Center>
          </Box>
        </>
      )}
    </>
  );
};
