import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10 * 1000,
});
