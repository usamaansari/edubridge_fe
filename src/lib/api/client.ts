import axios, { AxiosError } from "axios";
import { signOut } from "@/lib/auth/actions";
import type { ApiError } from "@/types";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 20_000,
});

export function toApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const data = error.response?.data as Partial<ApiError> | undefined;
    return {
      status: error.response?.status ?? 0,
      message: data?.message ?? error.message,
      details: data?.details,
    };
  }
  return { status: 0, message: error instanceof Error ? error.message : "Unknown error" };
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = toApiError(error);
    if (apiError.status === 401 && typeof window !== "undefined") {
      void signOut();
    }
    return Promise.reject(apiError);
  },
);
