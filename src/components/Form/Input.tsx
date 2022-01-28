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
import { ForwardRefRenderFunction, forwardRef, useState, useEffect } from "react";

interface InputProps extends ChakraInputProps {
  label?: string;
  error?: FieldError | null;
  Icon?: IconType;
}

const BaseInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error = null, Icon, ...rest },
  ref
) => {
  const [inputBorder, setInputBorder] = useState("gray.200");
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [colorIcon, setColorIcon] = useState("gray.900");

  useEffect(() => {
    if (error) {
      setInputBorder("red.500");
      setColorIcon("red.500");
    } else if(checkInput){
      setInputBorder("green.500");
      setColorIcon("green.500");
    }
  }, [error, checkInput]);

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {Icon && (
          <InputLeftElement color={ colorIcon } mt="7px">
            <Icon />
          </InputLeftElement>
        )}
        <ChakraInput
          h="55px"
          bg="gray.200"
          border="2px solid"
          color={ colorIcon }
          borderColor={ inputBorder }
          onChangeCapture={ (e) => {
            if (e.currentTarget.value.length > 0) {
              setCheckInput(true);
            }
            else {
              setCheckInput(false);
              setColorIcon("gray.900");
              setInputBorder("gray.200")
            }
          }}
          _focus={{}}
          _hover={{}}
          {...rest}
          ref={ref}
        />
      </InputGroup>
      {error && (
        <FormErrorMessage color={"red.700"}>{error.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(BaseInput);
