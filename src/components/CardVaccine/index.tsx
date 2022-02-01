import { Flex, Image, Icon, Box, Heading, Text } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import VaccineIcon from "../../assets/syringe-solid.svg";

interface VaccineCardProps {
  vaccineName: string;
  vaccineData: string;
  vaccineExpiration: string;
}

export const CardVaccine = ({
  vaccineName,
  vaccineData,
  vaccineExpiration,
}: VaccineCardProps) => {
  return (
    <Flex direction="row" p="5" h="80px" w="80%">
      <Image src={VaccineIcon} w="50" h="48" alt="teste" />
      <Flex w="80%" justify="space-between">
        <Box>
          <Heading as="h4" size="sm">
            {vaccineName}
          </Heading>
          <Text>{vaccineData}</Text>
        </Box>
        <Box>
          <Icon as={FaEdit} w="20px" h="20px" />
          <Text>{vaccineExpiration} meses</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
