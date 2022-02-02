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
  name: string;
  specie: string;
  age: Date;
  img_url: string;
}

export const ModalPet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const schemaEdit = yup.object().shape({
    name: yup.string().required(),
    specie: yup.string().required(),
    age: yup.date().required(),
    img_url: yup.string().required(),
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
                label="Nome"
                placeholder="Ex: PLuto"
                {...register("name")}
                error={errors.name}
              />

              <Input
                label="Espécie"
                placeholder="Ex: Cachorro"
                {...register("specie")}
                error={errors.specie}
              />
              <Input
                type="date"
                label="Data de nascimento"
                {...register("age")}
                error={errors.age}
              />

              <Input
                label="Imagem"
                {...register("img_url")}
                error={errors.img_url}
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
