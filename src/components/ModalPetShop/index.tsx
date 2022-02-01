import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";

export const ModalPetshop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Tipo de serviço</FormLabel>
              <Input id="service" />
              <FormHelperText>Ex: Banho e Tosa</FormHelperText>

              <FormLabel>Frequência</FormLabel>
              <RadioGroup defaultValue="diario">
                <HStack spacing="10px">
                  <Radio value="diario">Diariamente</Radio>
                  <Radio value="semanal">Semanalmente</Radio>
                  <Radio value="mensal">Mensalmente</Radio>
                </HStack>
              </RadioGroup>

              <FormLabel>Data</FormLabel>
              <Input id="date" type="date" />

              <FormLabel>Valor</FormLabel>
              <Input id="price" type="number" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => console.log("deletado")}>Deletar</Button>
            <Button onClick={() => console.log("confirmado")}>Confirmar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
