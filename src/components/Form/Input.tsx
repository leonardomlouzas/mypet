import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FieldError } from "react-hook-form";
import { ForwardRefRenderFunction, forwardRef } from "react";

interface InputProps extends ChakraInputProps {
  label?: string;
  error?: FieldError | null;
  Icon?: IconType;
}



const BaseInput: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ label, error = null, Icon,  ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel>{ label }</FormLabel>
      )}
      <InputGroup>
        {Icon && (
            <InputLeftElement mt="7px">
              <Icon />
            </InputLeftElement>
          )}
        <ChakraInput h="55px" bg="gray.200" _focus={ {} } _hover={ {} } { ...rest } ref={ ref }/>
        {error && (
          <FormErrorMessage color={"red.700"}>{ error }</FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(BaseInput);
