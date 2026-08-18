// src/TipCalculatorApp.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
import { ProtectedRoute } from "./auth/components/ProtectedRoute";
import { LoginForm } from "./auth/components/LoginForm";
import { MainLayout } from "./shared/layout/MainLayout";
import { CalculatorView } from "./tip/components/CalculatorView";
import { ExpenseFormView } from "./tip/components/ExpenseFormView";
import { HistoryView } from "./tip/components/HistoryView";
import { CreateEntityView } from "./tip/components/CreateEntityView";

export const TipCalculatorApp = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route
            path="/login"
            element={
              <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <LoginForm />
              </div>
            }
          />
          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<Navigate to="/history" replace />} />
              <Route path="/calculator" element={<CalculatorView />} />
              <Route path="/expense" element={<ExpenseFormView />} />
              <Route path="/history" element={<HistoryView />} />
              <Route
                path="/create-group"
                element={<CreateEntityView type="group" />}
              />
              <Route
                path="/create-category"
                element={<CreateEntityView type="category" />}
              />
              <Route
                path="/create-source"
                element={<CreateEntityView type="source" />}
              />
              <Route
                path="/profile"
                element={
                  <div className="p-8 text-center text-gray-500">
                    Perfil del Usuario (Próximamente)
                  </div>
                }
              />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/history" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default TipCalculatorApp;
