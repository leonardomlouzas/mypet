import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../Form/Input";
import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";
import { useEffect } from "react";

interface ModalFeedProps {
  oldImg: string;
  oldNome: string;
  oldSpecie: string;
  oldRace: string;
  oldAge: number;
  petId: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface FormEditData {
  frequency: string;
  time: number;
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
  frequency?: Feed;
  id: number;
}

export const ModalFeed = ({
  oldImg,
  oldNome,
  oldSpecie,
  oldRace,
  oldAge,
  petId,
  isOpen,
  onOpen,
  onClose,
}: ModalFeedProps) => {
  const { user, accessToken } = useAuth();
  const { getPets, editPets } = usePets();

  const schemaEdit = yup.object().shape({
    frequency: yup.string().required(),
    time: yup.string().required(),
  });

  useEffect(() => {
    getPets(accessToken, user.id);
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormEditData>({
    resolver: yupResolver(schemaEdit),
  });

  const handleEdit = ({ frequency, time }: FormEditData) => {
    const newFeed = {
      img_url: oldImg,
      nome: oldNome,
      specie: oldSpecie,
      race: oldRace,
      age: oldAge,
      userId: user.id,
      id: petId,
      feed: {
        frequency: frequency,
        time: time,
      },
    };
    editPets(newFeed as Pets, petId, accessToken);
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
                type="time"
                label="time"
                {...register("time")}
                error={errors.time}
              />
            </VStack>

            <Flex mt="15px" justifyContent="space-between">
              <Button
                type="submit"
                bgColor="green.300"
                _hover={{ bgColor: "green.500" }}
              >
                Confirmar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
