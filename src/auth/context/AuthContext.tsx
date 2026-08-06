// src/auth/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoadingSession: boolean; // Útil para evitar parpadeos al recargar la página
  loginSession: (token: string, expiresInMinutes: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // Estado para saber si estamos validando el storage al inicio
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);

  useEffect(() => {
    // 1. Esto se ejecuta CADA VEZ que refrescas la página
    const checkSession = () => {
      const token = localStorage.getItem("authToken");
      const expiration = localStorage.getItem("tokenExpiration");

      if (token && expiration) {
        const now = new Date().getTime();
        const expirationTime = parseInt(expiration, 10);

        // 2. Validamos si la hora actual es MENOR a la hora de expiración
        if (now < expirationTime) {
          setIsAuthenticated(true);
        } else {
          // Si ya pasó la hora, destruimos la sesión
          logout();
        }
      }
      // Terminamos de validar
      setIsLoadingSession(false);
    };

    checkSession();
  }, []);

  const loginSession = (token: string, expiresInMinutes: number) => {
    // Calculamos la hora exacta en la que caducará (Hora actual + 60 min)
    const expirationTime = new Date().getTime() + expiresInMinutes * 60 * 1000;

    // Guardamos en el navegador
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());

    // Actualizamos el estado de React
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoadingSession, loginSession, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
