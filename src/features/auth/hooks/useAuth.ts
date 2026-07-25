import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AUTH_QUERY_KEY,
  loginRequest,
  logout,
  type AuthSession,
} from "../services/auth.service";
import type { LoginCredentials } from "../schemas/login.schema";

export function useAuth() {
  const queryClient = useQueryClient();

  const authQuery = useQuery<AuthSession | null>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => null,
    initialData: () =>
      queryClient.getQueryData<AuthSession | null>(AUTH_QUERY_KEY) ?? null,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const authData = authQuery.data ?? null;

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginRequest(credentials),
    onSuccess: (data, credentials) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, {
        ...data,
        username: credentials.username,
      });
    },
  });

  return {
    token: authData?.accessToken.token,
    username: authData?.username,
    isAuthenticated: !!authData?.accessToken.token,

    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    logout,
  };
}
