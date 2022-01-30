import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";

import { AuthProvider } from "./AuthContex";
import { UserProvider } from "./UserContext";
import { PetsProvider } from "./PetsContext";
import { VaccineProvider } from "./VaccineContext";
import { PetShopProvider } from "./PetShopContext";
import { FoodProvider } from "./FoodContext";

interface AppProviderProps {
  children: ReactNode;
}
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <UserProvider>
        <PetsProvider>
          <VaccineProvider>
            <PetShopProvider>
              <FoodProvider>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
              </FoodProvider>
            </PetShopProvider>
          </VaccineProvider>
        </PetsProvider>
      </UserProvider>
    </AuthProvider>
  );
};
