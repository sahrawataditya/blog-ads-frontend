import axios from "axios";
import Cookies from "js-cookie";

const api_endpoint =
  process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

export const fetcher = axios.create({
  baseURL: api_endpoint,
});

fetcher.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
