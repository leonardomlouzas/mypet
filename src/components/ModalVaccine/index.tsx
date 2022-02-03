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
import { Input } from "../Form/Input";
import { useAuth } from "../../contexts/ContextAuth";
import { useVaccine } from "../../contexts/ContextVaccines";

interface ModalVaccinesProps {
  vaccineId: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isNew: boolean;
  petId: number;
}
interface FormEditData {
  vaccine_name: string;
  date: Date;
  expiration: Date;
  price: number;
}

interface Vaccines {
  vaccine_name?: string;
  date?: string;
  expiration?: string;
  price?: number;
  petId?: number;
  status: boolean;
  id: number;
  userId?: number;
}

export const ModalVaccine = ({
  vaccineId,
  isOpen,
  onOpen,
  onClose,
  isNew,
  petId,
}: ModalVaccinesProps) => {
  const { accessToken, user } = useAuth();
  const { registerVaccine, editVaccine, removeVaccine } = useVaccine();

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

  const handleNew = ({
    vaccine_name,
    date,
    expiration,
    price,
  }: FormEditData) => {
    const newVaccine = {
      vaccine_name: vaccine_name,
      date: JSON.stringify(date),
      expiration: JSON.stringify(expiration),
      price: price,
      status: false,
      idPet: petId,
      userId: user.id,
      id: 0,
    };

    registerVaccine(newVaccine as Vaccines, accessToken);
    onClose();
  };

  const handleEdit = ({
    vaccine_name,
    date,
    expiration,
    price,
  }: FormEditData) => {
    const newVaccine = {
      vaccine_name: vaccine_name,
      date: JSON.stringify(date),
      expiration: JSON.stringify(expiration),
      price: price,
      status: false,
      id: vaccineId,
    };

    editVaccine(newVaccine as Vaccines, vaccineId, accessToken);
    onClose();
  };

  const handleDelete = (id: number) => {
    removeVaccine(id, accessToken);
    onClose();
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
            {!isNew && (
              <Button onClick={() => handleDelete(vaccineId)}>Deletar</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
