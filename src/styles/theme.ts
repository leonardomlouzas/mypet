import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    blue: {
      300: "#9CDAEF",
      500: "#00BEFF",
    },
    yellow: {
      300: "#FBF6BB",
      500: "#FFEB00",
    },
    gray: {
      200: "#F5F5F5",
      400: "#C4C4C4",
      900: "#222222",
    },
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    "2xl": "34px",
    "3xl": "38px",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.900",
      },
    },
  },
});
