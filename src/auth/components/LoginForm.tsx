import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm = () => {
  const { register, handleSubmit, errors, isLoading, errorApi } =
    useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
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

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Ingresar"}
      </button>
    </form>
  );
};
