import axios from "axios";

const BASE_URL = import.meta.env.VITE_PANDA;
const basicAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default basicAxios;
