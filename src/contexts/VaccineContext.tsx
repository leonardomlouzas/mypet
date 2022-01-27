import { api } from "../services/api";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

interface VaccineProviderProps {
  children: ReactNode;
}

interface Vaccines {
  vaccine_name?: string;
  date?: string;
  expiration?: string;
  price?: number;
  petId: number;
  status: boolean;
}

interface VaccinesProvidersData {
  vaccines: Vaccines[];
  getVaccines: (accessToken: string) => Promise<void>;
  registerVaccine: (data: Vaccines, accessToken: string) => Promise<void>;
  editVaccine: (data: Vaccines, accessToken: string) => Promise<void>;
}

const VaccineContext = createContext<VaccinesProvidersData>(
  {} as VaccinesProvidersData
);

const useVaccine = () => {
  const context = useContext(VaccineContext);

  if (!context) {
    throw new Error("useVaccine must be used within an VaccineProvider");
  }

  return context;
};

const VaccineProvider = ({ children }: VaccineProviderProps) => {
  const [vaccines, setVaccines] = useState<Vaccines[]>([]);

  const getVaccines = useCallback(async (accessToken: string) => {
    await api
      .get("/vaccines", {
        headers: { authorization: `Bearer${accessToken}` },
      })
      .then((response) => setVaccines(response.data))
      .catch((err) => console.log("getVaccines fucntion error", err));
  }, []);

  const registerVaccine = useCallback(
    async (data: Vaccines, accessToken: string) => {
      await api
        .post("/vaccines", data, {
          headers: { authorization: `Bearer${accessToken}` },
        })
        .catch((err) => console.log("registerVaccines function error", err));
    },
    []
  );

  const editVaccine = useCallback(
    async (data: Vaccines, accessToken: string) => {
      await api
        .patch("/vaccines", data, {
          headers: { authorization: `Bearer${accessToken}` },
        })
        .catch((err) => console.log("editVaccine function error", err));
    },
    []
  );

  return (
    <VaccineContext.Provider
      value={{ vaccines, getVaccines, registerVaccine, editVaccine }}
    >
      {children}
    </VaccineContext.Provider>
  );
};

export { VaccineProvider, useVaccine };
