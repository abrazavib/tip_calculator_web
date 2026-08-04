import axios from "axios";

// 1. Instancia base
export const apiClient = axios.create({
  baseURL: "https://helthy-finances-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Interceptor de Peticiones (Request)
// Se ejecuta ANTES de que la petición salga hacia el backend
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    // Si hay un token guardado, lo inyectamos en las cabeceras
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de Respuestas (Response)
// Se ejecuta cuando el backend responde
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status, config } = error.response;

      // Token expirado
      const isLoginRequest = config.url?.includes("/auth/login");

      if (status === 401 && !isLoginRequest) {
        // Limpiar sesión
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiration");
        window.location.href = "/login";
      }

      // Si es 500 (Error interno del servidor)
      if (status >= 500) {
        console.error("Error crítico en el servidor:", error.response.data);
      }
    }
    return Promise.reject(error);
  },
);
