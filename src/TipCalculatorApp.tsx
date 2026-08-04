import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
import { ProtectedRoute } from "./auth/components/ProtectedRoute"; // (Creado en la respuesta anterior)
import { LoginForm } from "./auth/components/LoginForm";
import { CalculatorView } from "./tip/components/CalculatorView";

export const TipCalculatorApp = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <div className="min-h-screen flex items-center justify-center bg-slate-100">
                  <LoginForm />
                </div>
              }
            ></Route>
            <Route element={<ProtectedRoute />}>
              {/* Renderizas el componente padre de tu funcionalidad tip */}
              <Route path="/calculator" element={<CalculatorView />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/calculator" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default TipCalculatorApp;
