import {
  Flex,
  Image,
  Box,
  Heading,
  Text,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import VaccineIcon from "../../assets/syringe-solid.svg";
import ArrowIcon from "../../assets/arrow-left-solid.svg";
import BgImage from "../../assets/background.png";
import { useVaccine } from "../../contexts/ContextVaccines";
import { Header } from "../Header";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";

import { ModalVaccine } from "../ModalVaccine";

interface VaccineCardProps {
  petName: string;
  petId: number;
  mobile: boolean;
  closeVaccine: () => void;
}

export const CardVaccine = ({
  petName,
  petId,
  mobile,
  closeVaccine,
}: VaccineCardProps) => {
  const { accessToken } = useAuth();
  const { pets } = usePets();
  const { vaccines, getVaccines } = useVaccine();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [vaccineId, setVaccineId] = useState(0);

  const selected = pets.filter((item) => item.id === petId);

  useEffect(() => {
    getVaccines(accessToken);
  });

  const handler = (vaccineId: number) => {
    setVaccineId(vaccineId);
    onOpen();
  };

  return (
    <>
      {mobile ? (
        <Box w="100vw" h="100vh" bg="blue.300" bgImg={BgImage}>
          <ModalVaccine
            vaccineId={vaccineId}
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
                      onClick={closeVaccine}
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
                {vaccines.map((item, index) => (
                  <Flex
                    key={index}
                    direction="row"
                    p="5"
                    w="100%"
                    justify="space-evenly"
                    onClick={() => handler(item.id)}
                    _hover={{
                      borderRadius: "15px",
                      bg: "blue.300",
                      cursor: "pointer",
                    }}
                  >
                    <Image src={VaccineIcon} w="35px" h="35px" mr="15px" />
                    <Box>
                      <Heading as="h3" size="24px">
                        {item.vaccine_name}
                      </Heading>
                      <Text>{item.date}</Text>
                      <Text>{item.expiration}</Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <>
          <ModalVaccine
            vaccineId={vaccineId}
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
              <Image src={ArrowIcon} w="50px" h="30px" onClick={closeVaccine} />
            </Flex>
            <Box bg="gray.200" w="100%" minH="400px">
              {vaccines.map((item, index) => (
                <Flex
                  key={index}
                  direction="row"
                  align="center"
                  p="5"
                  borderBottom="1px"
                  w="100%"
                  onClick={() => handler(item.id)}
                >
                  <Image src={VaccineIcon} w="35px" h="35px" mr="15px" />
                  <Box>
                    <Heading as="h3" size="16px">
                      {item.vaccine_name}
                    </Heading>
                    <Text>{item.date}</Text>
                    <Text>{item.expiration}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Center w="100%" h="70px" bg="yellow.300" p="5">
              <Heading as="h4" size="md">
                Adicionar Vacina
              </Heading>
            </Center>
          </Box>
        </>
      )}
    </>
  );
};
