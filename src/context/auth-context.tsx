import { createContext, useContext, useEffect, useState } from "react";
import {
  setUserToken,
  removeUserToken,
  getUserToken,
} from "@/helpers/axios-api-helpers";
// import { useNavigate } from "react-router";
import userAuthServices from "@/services/auth-user-services";
import type { FormUserSchemaType } from "@/pages/login";
import type { FormSchemaType } from "@/pages/signup";
import type { User } from "@/types/user";
import { getUserLoginObject } from "@/services/userInfo";

interface AuthContextType {
  token: string | null;
  user: User | null;
  registerUser: (userData: FormSchemaType) => Promise<boolean>;
  loginUser: (newUser: FormUserSchemaType) => Promise<boolean>;
  loading: boolean;

  // Define the shape of your auth context here
  // For example, you might have user, login, logout, etc.
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(
    () => getUserToken() ?? null
  );
  const { registerUser, loginUser } = userAuthServices;
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  console.log("user", user);

  useEffect(() => {
    const storedToken = getUserToken();
    const storedUser = getUserLoginObject();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      setLoading(false);
    }
  }, []);

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      setUserToken(token);
    } else {
      removeUserToken();
    }
  };

  const value = {
    token,
    setToken,
    registerUser,
    loginUser,
    user,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
