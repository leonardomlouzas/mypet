import { Button } from "@chakra-ui/react";

interface BotaoProps {
  content: string;
}
export const Botao = ({ content }: BotaoProps) => (
  <Button backgroundColor="" color="">
    {content}
  </Button>
);
