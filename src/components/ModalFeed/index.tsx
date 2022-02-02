import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../Form/Input";

interface FormEditData {
  feed: string;
  time: string;
}
export const ModalFeed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const schemaEdit = yup.object().shape({
    feed: yup.string().required(),
    time: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormEditData>({
    resolver: yupResolver(schemaEdit),
  });

  const handleEdit = (data: FormEditData) => {
    console.log(data);
  };

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
          <ModalBody as="form" onSubmit={handleSubmit(handleEdit)}>
            <VStack alignItems="flex-start">
              <Text as="label">Frequência</Text>
              <RadioGroup label="Frequência" defaultValue="diario">
                <HStack spacing="10px">
                  <Radio value="diario" {...register("feed")}>
                    Diariamente
                  </Radio>
                  <Radio value="semanal" {...register("feed")}>
                    Semanalmente
                  </Radio>
                  <Radio value="mensal" {...register("feed")}>
                    Mensalmente
                  </Radio>
                </HStack>
              </RadioGroup>

              <Input
                type="time"
                label="time"
                {...register("time")}
                error={errors.time}
              />
            </VStack>

            <Button type="submit">Confirmar</Button>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => console.log("confirmado")}>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
