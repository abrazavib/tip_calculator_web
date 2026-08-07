// src/shared/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

export const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Área de contenido principal. El pb-16 (padding-bottom) asegura que 
          el contenido no quede oculto detrás de la barra inferior */}
      <main className="flex-1 overflow-y-auto pb-16">
        {/* Aquí React Router inyectará la Calculadora, el Historial, etc. */}
        <Outlet />
      </main>

      {/* Barra inferior fijada al fondo de la pantalla */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
};
