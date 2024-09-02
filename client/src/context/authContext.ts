import { createContext } from "react";

interface AuthContextType {
  loginSubmitHandler: (userData: { email: string; password: string }) => void;
  registerSubmitHandler: (userData: {
    email: string;
    password: string;
  }) => void;
  logoutHandler: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
