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
  item: string;
  price: number;
  quantity: number;
  frequency: string;
  details: string;
}
export const ModalFood = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Button onClick={() => console.log("confirmado")}>Deletar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
