import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";

import { AuthProvider } from "./ContextAuth";
import { UserProvider } from "./ContextUser";
import { PetsProvider } from "./ContextPets";
import { VaccineProvider } from "./ContextVaccines";
import { PetShopProvider } from "./ContextPetShop";
import { FoodProvider } from "./ContextFood";

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
