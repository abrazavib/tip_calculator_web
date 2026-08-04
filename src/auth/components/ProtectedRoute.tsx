import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, redirige al login y reemplaza el historial
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renderiza la Calculadora (hijo)
};
