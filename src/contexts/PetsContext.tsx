import { api } from "../services/api";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

interface PetsProviderProps {
  children: ReactNode;
}

interface Feed {
  frequency?: string;
  time?: number;
}

interface Pets {
  image_url: string;
  name: string;
  specie: string;
  race: string;
  age: number;
  userId: number;
  feed?: Feed;
  id: number;
}

interface PetsContextData {
  pets: Pets[];
  getPets: (accessToekn: string) => Promise<void>;
  registerPets: (data: Pets, accessToken: string) => Promise<void>;
}

const PetsContext = createContext<PetsContextData>({} as PetsContextData);

const usePets = () => {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error("usePets must be used within an PetsProvider");
  }

  return context;
};

const PetsProvider = ({ children }: PetsProviderProps) => {
  const [pets, setPets] = useState<Pets[]>([]);

  const getPets = useCallback(async (accessToken: string) => {
    await api
      .get("/pets", {
        headers: { authorization: `Bearer${accessToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setPets(response.data);
      })
      .catch((err) => console.log("getPets function error", err));
  }, []);

  const registerPets = useCallback(async (data: Pets, accessToken: string) => {
    await api
      .post("/pets", {
        headers: { authorization: `Bearer${accessToken}` },
      })
      .catch((err) => console.log("registerPets function error", err));
  }, []);

  return (
    <PetsContext.Provider value={{ pets, getPets, registerPets }}>
      {children}
    </PetsContext.Provider>
  );
};

export { PetsProvider, usePets };
