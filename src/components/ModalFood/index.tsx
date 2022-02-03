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
import { useAuth } from "../../contexts/ContextAuth";
import { useFood } from "../../contexts/ContextFood";

interface ModalFoodProps {
  foodId: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
interface FormEditData {
  item: string;
  price: number;
  quantity: string;
  frequency: string;
  details: string;
}
interface Food {
  item?: string;
  price?: number;
  quantity?: string;
  frequency?: string;
  details?: string;
  userId: number;
  id: number;
}

export const ModalFood = ({
  foodId,
  isOpen,
  onOpen,
  onClose,
}: ModalFoodProps) => {
  const { accessToken } = useAuth();
  const { editFood, removeFood } = useFood();

  const schemaEdit = yup.object().shape({
    item: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required(),
    frequency: yup.string(),
    details: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormEditData>({
    resolver: yupResolver(schemaEdit),
  });

  const handleEdit = ({
    item,
    price,
    quantity,
    frequency,
    details,
  }: FormEditData) => {
    const newFood = {
      item: item,
      price: price,
      quantity: quantity,
      frequency: frequency,
      details: details,
      id: foodId,
    };
    editFood(newFood as Food, foodId, accessToken);
    onClose();
  };

  const handleDelete = (id: number) => {
    removeFood(id, accessToken);
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
          <ModalHeader>Editar</ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form" onSubmit={handleSubmit(handleEdit)}>
            <VStack alignItems="flex-start">
              <Input
                label="Nome do item"
                placeholder="Ex: Ração "
                {...register("item")}
                error={errors.item}
              />
              <Text as="label">Frequência de compra</Text>
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
                type="number"
                label="Quantidade"
                {...register("quantity")}
                error={errors.quantity}
              />

              <Input
                label="Valor"
                type="number"
                step="any"
                {...register("price")}
                error={errors.price}
              />

              <Input
                type="details"
                label="Detalhes"
                {...register("details")}
                error={errors.details}
              />
            </VStack>

            <Button type="submit">Confirmar</Button>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleDelete(foodId)}>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};