import { api } from "../services/api";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";

import { useHistory } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  id: string;
  name: string;
  password: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface SignInCredential {
  email: string;
  password: string;
}

interface RegisterCredential {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  accessToken: string;
  user: User;
  signIn: (credenteials: SignInCredential) => Promise<void>;
  signOut: () => void;
  registerUser: (credential: RegisterCredential) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@MyPets:accessToken");
    const user = localStorage.getItem("@MyPets:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const history = useHistory();

  const signIn = useCallback(async ({ email, password }: SignInCredential) => {
    const response = await api.post("/login", { email, password });
    const { accessToken, user } = response.data;
    localStorage.setItem("@MyPets:acessToken", accessToken);
    localStorage.setItem("@MyPets:user", JSON.stringify(user));

    setUserData({ accessToken, user });
    history.push("/dashboard");
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@MyPets:accessToken");
    localStorage.removeItem("@MyPets:user");
    setUserData({} as AuthContextData);
    history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = useCallback(async (data: RegisterCredential) => {
    await api.post("/register", data).catch((err) => console.log(err));
    history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: userData.accessToken,
        user: userData.user,
        signIn,
        signOut,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
