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
import { useAuth } from "../../contexts/ContextAuth";
import { usePets } from "../../contexts/ContextPets";

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

export const ModalFeed =
  (/*{oldImg, oldNome, oldSpecie, oldRace, oldAge, oldUserId, oldId}*/) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, accessToken } = useAuth();
    const { editPets } = usePets();

    const schemaEdit = yup.object().shape({
      frequency: yup.string().required(),
      time: yup.string().required(),
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
        // img_url: oldImg,
        // nome: oldNome,
        // specie: oldSpecie,
        // race: oldRace,
        // age: oldAge,
        // userId: oldUserId,
        // id: oldId,
        frequency: {
          frequency: frequency,
          time: time,
        },
      };
      const petId = 2;
      editPets(newFeed as Pets, petId, accessToken);
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

              <Button type="submit">Confirmar</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
