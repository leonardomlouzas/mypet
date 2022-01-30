import { Flex, Icon, Box, Heading, Text } from "@chakra-ui/react";

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
      <Icon w="50" h="48" alt="teste" />
      <Flex w="80%">
        <Box>
          <Heading>{vaccineName}</Heading>
          <Text>{vaccineData}</Text>
        </Box>
        <Box>
          <Icon w="20px" h="20px" />
          <Text>{vaccineExpiration} meses</Text>
        </Box>
        11
      </Flex>
    </Flex>
  );
};
