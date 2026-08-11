// src/TipCalculatorApp.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
import { ProtectedRoute } from "./auth/components/ProtectedRoute";
import { LoginForm } from "./auth/components/LoginForm";
import { MainLayout } from "./shared/layout/MainLayout";
import { CalculatorView } from "./tip/components/CalculatorView";
import { ExpenseFormView } from "./tip/components/ExpenseFormView";

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
              <Route path="/calculator" element={<CalculatorView />} />
              <Route path="/expense" element={<ExpenseFormView />} />
              <Route
                path="/history"
                element={
                  <div className="p-8 text-center text-gray-500">
                    Historial (Próximamente)
                  </div>
                }
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
          <Route path="*" element={<Navigate to="/calculator" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default TipCalculatorApp;
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./auth/context/AuthContext";
// import { ProtectedRoute } from "./auth/components/ProtectedRoute"; // (Creado en la respuesta anterior)
// import { LoginForm } from "./auth/components/LoginForm";
// import { CalculatorView } from "./tip/components/CalculatorView";

// export const TipCalculatorApp = () => {
//   return (
//     <>
//       <AuthProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route
//               path="/login"
//               element={
//                 <div className="min-h-screen flex items-center justify-center bg-slate-100">
//                   <LoginForm />
//                 </div>
//               }
//             ></Route>
//             <Route element={<ProtectedRoute />}>
//               {/* Renderizas el componente padre de tu funcionalidad tip */}
//               <Route path="/calculator" element={<CalculatorView />} />
//             </Route>

//             {/* Fallback */}
//             <Route path="*" element={<Navigate to="/calculator" replace />} />
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </>
//   );
// };

// export default TipCalculatorApp;
