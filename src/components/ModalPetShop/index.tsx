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
import { usePetShop } from "../../contexts/ContextPetShop";
import { useAuth } from "../../contexts/ContextAuth";
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
  status: boolean;
}

export const ModalPetshop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, accessToken } = useAuth();

  const { editPetShop, deletePetShop } = usePetShop();

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

  const handleEdit = ({ service, date, price, frequency }: FormEditData) => {
    const newPetShop = {
      service: service,
      date: JSON.stringify(date),
      price: price,
      frequency: frequency,
      status: true,
    };
    const id = 2;
    editPetShop(newPetShop as PetShop, id, accessToken);
  };

  const handleDelete = (id: number) => {
    deletePetShop(id, accessToken);
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
            <Button onClick={() => handleDelete(2)}>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
