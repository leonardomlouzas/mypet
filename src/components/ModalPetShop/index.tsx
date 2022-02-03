import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { usePetShop } from "../../contexts/ContextPetShop";
import { useAuth } from "../../contexts/ContextAuth";

interface PetShopModalProps {
  petShopId: number;
  petId: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isNew: boolean;
}

interface FormEditData {
  service: string;
  date: Date;
  price: number;
  frequency: string;
}

interface PetShop {
  service?: string;
  petName?: number;
  price?: number;
  date?: string;
  frequency?: string;
  userId: number;
  idPet: number;
  status: boolean;
  id: number;
}

export const ModalPetshop = ({
  petShopId,
  petId,
  isOpen,
  onOpen,
  onClose,
  isNew,
}: PetShopModalProps) => {
  const { accessToken, user } = useAuth();

  const { registerPetShop, editPetShop, deletePetShop } = usePetShop();

  const schemaEdit = yup.object().shape({
    service: yup.string().required(),
    frequency: yup.string(),
    date: yup.date().required(),
    price: yup.number().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormEditData>({
    resolver: yupResolver(schemaEdit),
  });

  const handleNew = ({ service, date, price, frequency }: FormEditData) => {
    const newPetShop = {
      service: service,
      date: JSON.stringify(date),
      price: price,
      frequency: frequency,
      idPet: petId,
      status: true,
      userId: user.id,
    };
    registerPetShop(newPetShop as PetShop, accessToken);
    onClose();
  };

  const handleEdit = ({ service, date, price, frequency }: FormEditData) => {
    const newPetShop = {
      service: service,
      date: JSON.stringify(date),
      price: price,
      frequency: frequency,
      idPet: petId,
      status: true,
    };
    editPetShop(newPetShop as PetShop, petShopId, accessToken);
    onClose();
  };

  const handleDelete = (id: number) => {
    deletePetShop(id, accessToken);
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
                label="Tipo de serviço"
                placeholder="Ex: Banho e Tosa."
                {...register("service")}
                error={errors.service}
              />
              <Text as="label">Frequência</Text>
              <RadioGroup label="Frequência" defaultValue="diario">
                <HStack spacing="10px">
                  <Radio value="diario" {...register("frequency")}>
                    Diariamente
                  </Radio>
                  <Radio value="semanal" {...register("frequency")}>
                    Semanalmente
                  </Radio>
                  <Radio value="mensal" {...register("frequency")}>
                    Mensalmente
                  </Radio>
                </HStack>
              </RadioGroup>

              <Input
                type="date"
                label="Data"
                {...register("date")}
                error={errors.date}
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
              <Button onClick={() => handleDelete(petShopId)}>Deletar</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
