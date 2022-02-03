import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import Bowl from "../../assets/bowl-solid.svg";
import ArrowIcon from "../../assets/arrow-left-solid.svg";
import BgImage from "../../assets/background.png";
import { Header } from "../Header";
import { usePets } from "../../contexts/ContextPets";
import { ModalFeed } from "../ModalFeed";

interface FeedProps {
  petName: string;
  petId: number;
  img: string;
  age: number;
  race: string;
  specie: string;
  mobile: boolean;
  closeFeed: () => void;
}
export const CardFeed = ({
  petName,
  petId,
  mobile,
  closeFeed,
  img,
  age,
  race,
  specie,
}: FeedProps) => {
  const { pets } = usePets();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selected = pets.filter((item) => item.id === petId);

  return (
    <>
      {mobile ? (
        <Box w="100vw" h="100vh" bg="blue.300" bgImg={BgImage}>
          <ModalFeed
            petId={petId}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            oldAge={age}
            oldImg={img}
            oldNome={petName}
            oldRace={race}
            oldSpecie={specie}
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
                    <Badge bg="yellow.300">{selected[0].specie}</Badge>
                    <Text>{selected[0].age}</Text>
                  </Box>
                  <Box>
                    <Image
                      src={ArrowIcon}
                      w="50px"
                      h="30px"
                      onClick={closeFeed}
                      _hover={{ cursor: "pointer" }}
                    />
                  </Box>
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
                {pets.map((item, index) => (
                  <Flex
                    key={index}
                    direction="row"
                    p="5"
                    w="100%"
                    align="center"
                    justify="flex-start"
                    borderRadius="15px"
                    bg="gray.300"
                    _hover={{
                      cursor: "pointer",
                      bg: "blue.300",
                      borderRadius: "15px",
                    }}
                  >
                    <Image src={Bowl} w="35px" h="35px" mr="15px" />
                    <Box>
                      <Heading as="h3" size="24px">
                        Freq: {item.feed?.frequency}
                      </Heading>
                      <Text>Horário: {item.feed?.time}</Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <>
          <ModalFeed
            petId={petId}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            oldAge={age}
            oldImg={img}
            oldNome={petName}
            oldRace={race}
            oldSpecie={specie}
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
              <Image
                src={ArrowIcon}
                w="50px"
                h="30px"
                onClick={closeFeed}
                _hover={{ cursor: "pointer" }}
              />
            </Flex>
            <Box bg="gray.200" w="100%" minH="400px">
              {pets.map((item, index) => (
                <Flex
                  key={index}
                  direction="row"
                  p="5"
                  borderBottom="1px"
                  w="100%"
                  onClick={onOpen}
                >
                  <Image src={Bowl} w="35px" h="35px" mr="15px" />
                  <Box>
                    <Heading as="h3">{item.feed?.frequency}</Heading>
                    <Text>{item.feed?.time}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Center w="100%" h="70px" bg="yellow.300" p="5">
              <Heading as="h4">Adicionar Alimento</Heading>
            </Center>
          </Box>
        </>
      )}
    </>
  );
};
