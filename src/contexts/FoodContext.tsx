import { api } from "../services/api";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

interface FoodProviderProps {
  children: ReactNode;
}

interface Food {
  item: string;
  price: number;
  quantity: string;
  frequency: string;
  details: string;
  petId: number;
  userId: number;
}

interface FoodProviderData {
  food: Food[];
  getFood: (accessToken: string) => Promise<void>;
  registerFood: (data: Food, accessToken: string) => Promise<void>;
  editFood: (data: Food, id: number, accessToken: string) => Promise<void>;
  removeFood: (id: number, accessToken: string) => Promise<void>;
}

const FoodContext = createContext<FoodProviderData>({} as FoodProviderData);

const useFood = () => {
  const context = useContext(FoodContext);

  if (!context) {
    throw new Error("useFood mus be used within a FoodProvider");
  }

  return context;
};

const FoodProvider = ({ children }: FoodProviderProps) => {
  const [food, setFood] = useState<Food[]>([]);

  const getFood = useCallback(async (accessToken: string) => {
    await api
      .get("/food", {
        headers: { authorization: `Bearer${accessToken}` },
      })
      .then((response) => setFood(response.data))
      .catch((err) => console.log("getFood function error", err));
  }, []);

  const registerFood = useCallback(async (data: Food, accessToken: string) => {
    await api
      .post("/food", data, {
        headers: { authorization: `Bearer${accessToken}` },
      })
      .catch((err) => console.log("registerFood function error", err));
  }, []);

  const editFood = useCallback(
    async (data: Food, id: number, accessToken: string) => {
      await api
        .patch(`/food/${id}`, data, {
          headers: { authorization: `Bearer${accessToken}` },
        })
        .catch((err) => console.log("editFood function error", err));
    },
    []
  );

  const removeFood = useCallback(async (id: number, accessToken: string) => {
    await api
      .delete(`/food/${id}`, {
        headers: { authorization: `Bearer${accessToken}` },
      })
      .catch((err) => console.log("removeFood function error", err));
  }, []);

  return (
    <FoodContext.Provider
      value={{ food, getFood, registerFood, editFood, removeFood }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export { FoodProvider, useFood };
