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
  vaccine_name: string;
  date: Date;
  expiration: Date;
  price: number;
}
export const ModalVaccine = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const schemaEdit = yup.object().shape({
    vaccine_name: yup.string().required(),
    date: yup.date().required(),
    expiration: yup.date().required(),
    price: yup.number().required(),
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
              <Input
                label="Nome da vacina"
                placeholder="Ex: Antirrábica"
                {...register("vaccine_name")}
                error={errors.vaccine_name}
              />

              <Input
                type="date"
                label="Data"
                {...register("date")}
                error={errors.date}
              />

              <Input
                type="date"
                label="Data de expiração"
                {...register("expiration")}
                error={errors.expiration}
              />

              <Input
                label="Valor"
                type="number"
                step="any"
                {...register("price")}
                error={errors.price}
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
