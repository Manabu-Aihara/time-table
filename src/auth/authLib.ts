import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/event/auth';
const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
const requestIntercept = authAxios.interceptors.request.use(
	(config) => {
		// if (!config.headers["Authorization"]) {
		// 	config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
		// }
		return config;
	},
	(error) => Promise.reject(error)
);

