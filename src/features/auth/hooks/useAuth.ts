import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTH_QUERY_KEY, loginRequest, logout } from "../services/auth.service";
import type { LoginCredentials, LoginResponse } from "../schemas/login.schema";

export function useAuth() {
  const queryClient = useQueryClient();

  const authQuery = useQuery<LoginResponse | null>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => null,
    initialData: () =>
      queryClient.getQueryData<LoginResponse | null>(AUTH_QUERY_KEY) ?? null,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const authData = authQuery.data ?? null;

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginRequest(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data);
    },
  });

  return {
    token: authData?.accessToken.token,
    isAuthenticated: !!authData?.accessToken.token,

    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    logout,
  };
}
