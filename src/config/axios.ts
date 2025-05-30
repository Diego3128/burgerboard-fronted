import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});
