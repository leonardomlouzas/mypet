import { api } from "../services/api";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  name: string;
  password: string;
}

interface UserProviderData {
  user: User[];
  getUser: (accessToken: string) => Promise<void>;
  changeUser: (data: User, accessToken: string) => Promise<void>;
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User[]>([]);

  const getUser = useCallback(async (accessToken: string) => {
    await api
      .get("/user", {
        headers: { authorization: `Bearer${accessToken}` },
      })
      .catch((err) => console.log("getUser function error", err));
  }, []);

  const changeUser = useCallback(async (data: User, accessToken: string) => {
    await api
      .patch("/user", data, {
        headers: { authorization: `Bearer${accessToken}` },
      })
      .then((response) => setUser(response.data.user))
      .catch((err) => console.log("changeUser function error", err));
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
