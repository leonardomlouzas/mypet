import {
  Flex,
  Image,
  Box,
  Heading,
  Text,
  Center,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import VaccineIcon from "../../assets/syringe-solid.svg";
import ArrowIcon from "../../assets/arrow-left-solid.svg";
import BgImage from "../../assets/background.png";
import PlusIcon from "../../assets/plus-solid.svg";
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
  const { user, accessToken } = useAuth();
  const { pets } = usePets();
  const { vaccines, getVaccines } = useVaccine();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [vaccineId, setVaccineId] = useState(0);

  const [isNew, setIsNew] = useState(false);

  const selected = pets.filter((item) => item.id === petId);
  const selectedVaccine = vaccines.filter((item) => item.idPet === petId);

  useEffect(() => {
    getVaccines(user.id, petId, accessToken);
  }, [isOpen, onClose]);

  const handler = (vaccineId: number, state: boolean) => {
    if (state) {
      setIsNew(true);
      onOpen();
    } else {
      setIsNew(false);
      setVaccineId(vaccineId);
      onOpen();
    }
  };

  return (
    <>
      <ModalVaccine
        vaccineId={vaccineId}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isNew={isNew}
        petId={petId}
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
                      onClick={closeVaccine}
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
                {selectedVaccine.map((item, index) => (
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
                    <Image src={VaccineIcon} w="35px" h="35px" mr="15px" />
                    <Box>
                      <Heading as="h3" size="24px">
                        {item.vaccine_name}
                      </Heading>
                      <Text>Data:{item.date}</Text>
                      <Text>Exp:{item.expiration}</Text>
                      <Text>R$: {item.price}</Text>
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
              <Image src={ArrowIcon} w="30px" h="30px" onClick={closeVaccine} />
            </Flex>
            <Box bg="gray.200" w="100%" minH="400px">
              {selectedVaccine.map((item, index) => (
                <Flex
                  key={index}
                  direction="row"
                  align="center"
                  p="5"
                  borderBottom="1px"
                  w="100%"
                  onClick={() => handler(item.id, false)}
                >
                  <Image src={VaccineIcon} w="35px" h="35px" mr="15px" />
                  <Box>
                    <Heading as="h3" size="16px">
                      {item.vaccine_name}
                    </Heading>
                    <Text>{item.date}</Text>
                    <Text>{item.expiration}</Text>
                    <Text>R$: {item.price}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Flex align="center" justifyContent="center">
              <Center
                w="50%"
                h="70px"
                bg="yellow.300"
                p="5"
                borderRadius="15px"
                onClick={() => handler(0, true)}
                _hover={{ bg: "yellow.200", cursor: "pointer" }}
              >
                <Heading as="h4" size="md" textAlign="center">
                  Adicionar Vacina
                </Heading>
              </Center>
            </Flex>
          </Box>
        </>
      )}
    </>
  );
};
