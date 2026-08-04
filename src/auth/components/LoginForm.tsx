import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/AuthService";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { loginSession } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorApi, setErrorApi] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorApi(null);
    try {
      const response = await authService.login(data);
      console.log(response.data.token);
      loginSession(response.data.token, 1440);

      // Redirigir a la app principal
      navigate("/calculator", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        if (errorMessage) {
          setErrorApi(errorMessage);
        } else {
          setErrorApi("Error desconocido.");
        }
      } else {
        setErrorApi("Credenciales incorrectas o error en el servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

      {errorApi && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {errorApi}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          type="email"
          className="border rounded p-2"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          className="border rounded p-2"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Usando tu componente compartido */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Ingresar"}
      </button>
    </form>
  );
};
