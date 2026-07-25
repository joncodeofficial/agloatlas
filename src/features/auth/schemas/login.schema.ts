import { z } from 'zod';

export const loginCredentialsSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;

const authTokenSchema = z.object({
  token: z.string(),
  expiration: z.string(),
});

export const loginResponseSchema = z.object({
  accessToken: authTokenSchema,
  refreshToken: authTokenSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
