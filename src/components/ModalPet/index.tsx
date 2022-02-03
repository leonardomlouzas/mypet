import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePets } from "../../contexts/ContextPets";
import { useAuth } from "../../contexts/ContextAuth";
import { Input } from "../Form/Input";

interface ModalPetProps {
  petId: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isNew: boolean;
}

interface FormEditData {
  nome: string;
  specie: string;
  age: number;
  img_url: string;
}

interface Feed {
  frequency?: string;
  time?: number;
}

interface Pets {
  img_url: string;
  nome: string;
  specie: string;
  race: string;
  age: number;
  userId: number;
  feed?: Feed;
  id: number;
}
export const ModalPet = ({
  petId,
  isOpen,
  onOpen,
  onClose,
  isNew,
}: ModalPetProps) => {
  const { registerPets, editPets, removePets } = usePets();
  const { accessToken, user } = useAuth();

  const schemaEdit = yup.object().shape({
    nome: yup.string().required(),
    specie: yup.string().required(),
    age: yup.number().required(),
    img_url: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormEditData>({
    resolver: yupResolver(schemaEdit),
  });

  const handleNew = ({ nome, specie, age, img_url }: FormEditData) => {
    const newPet = {
      nome: nome,
      specie: specie,
      age: age,
      img_url: img_url,
      userId: user.id,
      feed: {},
    };
    console.log(newPet);
    registerPets(newPet as Pets, accessToken);
  };

  const handleEdit = ({ nome, specie, age, img_url }: FormEditData) => {
    const newPet = {
      nome: nome,
      specie: specie,
      age: age,
      img_url: img_url,
      userId: user.id,
      feed: {},
    };
    editPets(newPet as Pets, petId, accessToken);
  };

  const handleDelete = (id: number) => {
    removePets(id, accessToken);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isNew ? "Adicionar" : "Editar"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as="form"
            onSubmit={handleSubmit(isNew ? handleNew : handleEdit)}
          >
            <VStack alignItems="flex-start">
              <Input
                label="Nome"
                placeholder="Ex: PLuto"
                {...register("nome")}
                error={errors.nome}
              />

              <Input
                label="Espécie"
                placeholder="Ex: Cachorro"
                {...register("specie")}
                error={errors.specie}
              />
              <Input
                type="number"
                label="Idade"
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
            {!isNew && (
              <Button onClick={() => handleDelete(petId)}>Deletar</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
