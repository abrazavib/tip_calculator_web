import { apiClient } from "../../shared/api/apiClient";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  nombre: string;
  // Agrega otros campos que requiera tu servicio de registro
}

export interface AuthResponse {
  message: string;
  data: {
    user: {
      id: string;
      email: string;
    };
    token: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/api/v1/auth/login",
      credentials,
    );
    console.log(response.data);
    return response.data;
  },
};
