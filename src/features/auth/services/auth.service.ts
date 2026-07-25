import axios from 'axios';
import { API_CONFIG } from '@/shared/config/api';
import { loginResponseSchema, type LoginCredentials, type LoginResponse } from '../schemas/login.schema';

export async function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await axios.post(
    `${API_CONFIG.AUTH_BASE_URL}/Authentication/Login`,
    credentials
  );

  return loginResponseSchema.parse(data);
}
