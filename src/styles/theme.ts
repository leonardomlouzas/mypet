import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    yellow: {
      200: "#FBF6BB",
      300: "#FFEB00",
    },
    blue: {
      200: "#9CDAEF",
      300: "#00BEFF",
    },
    gray: {
      200: "#F5F5F5",
      300: "#C4C4C4",
    },
    fonts: {
      heading: "Rubik",
      body: "Rubik",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
  },
});
