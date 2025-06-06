import axios, { AxiosError } from "axios";
import { useAuthStore } from "../stores/auth/useAuthStore";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";
    // If it's a 401 and not from the login route, handle as unauthenticated
    if (status === 401 && !url?.includes("/api/login")) {
      console.warn("[Interceptor] Token invalid or expired. Redirecting...");
      // invalid or expired tokens will get the useAuthStore restored and the personal access token deleted.
      localStorage.removeItem("AUTH-TOKEN");
      useAuthStore.getState().reset();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
