import axios from "axios";
import { API_CONFIG } from "@/shared/config/api";
import {
  loginResponseSchema,
  type LoginCredentials,
  type LoginResponse,
} from "../schemas/login.schema";

function toLoginError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 400)
      return new Error("Usuario o contraseña son incorrectos");

    if (status === 401) return new Error("Usuario no autorizado");
  }

  return new Error("No se pudo iniciar sesión. Intentá de nuevo.");
}

export async function loginRequest(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  try {
    const { data } = await axios.post(
      `${API_CONFIG.AUTH_BASE_URL}/Authentication/Login`,
      credentials,
    );

    return loginResponseSchema.parse(data);
  } catch (error) {
    throw toLoginError(error);
  }
}
