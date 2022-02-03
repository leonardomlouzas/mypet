import { api } from "../services/api";

import {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useState,
} from "react";

interface PetShopProviderProps {
  children: ReactNode;
}

interface PetShop {
  service?: string;
  petName?: number;
  price?: number;
  date?: string;
  frequency?: string;
  userId: number;
  idPet: number;
  status: boolean;
  id: number;
}
interface PetShopProviderData {
  petShop: PetShop[];
  getPetShop: (accesToken: string) => Promise<void>;
  registerPetShop: (data: PetShop, accessToken: string) => Promise<void>;
  editPetShop: (
    data: PetShop,
    id: number,
    accessToken: string
  ) => Promise<void>;
  deletePetShop: (id: number, accessToken: string) => Promise<void>;
}

const PetShopContext = createContext<PetShopProviderData>(
  {} as PetShopProviderData
);

const usePetShop = () => {
  const context = useContext(PetShopContext);
  if (!context) {
    throw new Error("usePetShop musb be used within an PetShopProvider");
  }
  return context;
};
const PetShopProvider = ({ children }: PetShopProviderProps) => {
  const [petShop, setPetShop] = useState<PetShop[]>([]);

  const getPetShop = useCallback(async (accessToken: string) => {
    await api
      .get("/petShops", {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .then((response) => setPetShop(response.data))
      .catch((err) => console.log("getPetShop function error", err));
  }, []);

  const registerPetShop = useCallback(
    async (data: PetShop, accessToken: string) => {
      await api
        .post("/petShops", data, {
          headers: { authorization: `Bearer ${accessToken}` },
        })
        .catch((err) => console.log("registrationPetShop function error", err));
    },
    []
  );

  const editPetShop = useCallback(
    async (data: PetShop, id: number, accessToken: string) => {
      await api
        .patch(`/petShops/${id}`, data, {
          headers: { authorization: `Bearer ${accessToken}` },
        })
        .catch((err) => console.log("editPetShop function error", err));
    },
    []
  );

  const deletePetShop = useCallback(async (id: number, accessToken: string) => {
    await api
      .delete(`/petShops/${id}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .catch((err) => console.log("deletePetShop function error", err));
  }, []);

  return (
    <PetShopContext.Provider
      value={{
        petShop,
        getPetShop,
        registerPetShop,
        editPetShop,
        deletePetShop,
      }}
    >
      {children}
    </PetShopContext.Provider>
  );
};

export { PetShopProvider, usePetShop };
