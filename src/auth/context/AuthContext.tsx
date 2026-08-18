// src/auth/context/AuthContext.tsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useState, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoadingSession: boolean; // Útil para evitar parpadeos al recargar la página
  loginSession: (token: string, expiresInMinutes: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("authToken");
    const expiration = localStorage.getItem("tokenExpiration");

    if (!token || !expiration) {
      return false;
    }

    const now = new Date().getTime();
    const expirationTime = Number.parseInt(expiration, 10);
    return now < expirationTime;
  });
  const [isLoadingSession] = useState<boolean>(false);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    setIsAuthenticated(false);
  }, []);

  const loginSession = (token: string, expiresInMinutes: number) => {
    const expirationTime = new Date().getTime() + expiresInMinutes * 60 * 1000;

    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());

    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoadingSession, loginSession, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
