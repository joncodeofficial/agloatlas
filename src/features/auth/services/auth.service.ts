import axios, { isAxiosError } from 'axios';
import { API_CONFIG } from '@/shared/config/api';
import { queryClient } from '@/shared/lib/queryClient';
import { loginResponseSchema, type LoginCredentials, type LoginResponse } from '../schemas/login.schema';

export const AUTH_QUERY_KEY = ['auth'] as const;

export type AuthSession = LoginResponse & { username: string };

export function getAuthToken(): string | undefined {
  return queryClient.getQueryData<AuthSession | null>(AUTH_QUERY_KEY)?.accessToken.token;
}

export function logout() {
  queryClient.setQueryData(AUTH_QUERY_KEY, null);
  queryClient.clear();
}

function toLoginError(error: unknown): Error {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 400) return new Error('Usuario o contraseña son incorrectos');

    if (status === 401) return new Error('Usuario no autorizado');
  }

  return new Error('No se pudo iniciar sesión. Intentá de nuevo.');
}

export async function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const { data } = await axios.post(`${API_CONFIG.AUTH_BASE_URL}/Authentication/Login`, credentials);

    return loginResponseSchema.parse(data);
  } catch (error) {
    throw toLoginError(error);
  }
}
