import { Button, ButtonProps } from "@chakra-ui/react";

interface BotaoProps extends ButtonProps{
  content: string;
}
export const Botao = ({ content, ...rest }: BotaoProps) => (
  <Button { ...rest } >
    {content}
  </Button>
);
