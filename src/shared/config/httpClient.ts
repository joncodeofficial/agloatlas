import axios from "axios";
import { router } from "expo-router";
import { getAuthToken, logout } from "@/features/auth/services/auth.service";
import { API_CONFIG } from "./api";

export const coreHttpClient = axios.create({
  baseURL: API_CONFIG.CORE_BASE_URL,
});

coreHttpClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

coreHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logout();
      router.replace("/");
    }

    return Promise.reject(error);
  },
);
