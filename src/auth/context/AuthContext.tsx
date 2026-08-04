// src/auth/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loginSession: (token: string, expiration: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const expiration = localStorage.getItem("tokenExpiration");
    if (
      token &&
      expiration &&
      new Date().getTime() < parseInt(expiration, 10)
    ) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiration");
    }
  }, []);

  const loginSession = (token: string, expiresInMinutes: number) => {
    const expirationTime = new Date().getTime() + expiresInMinutes * 60 * 1000;
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
