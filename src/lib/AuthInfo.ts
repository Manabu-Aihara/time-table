import axios, { AxiosResponse, AxiosError } from "axios";

const BASE_URL = 'http://127.0.0.1:8000/';
const basicAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
// basicAxios.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     switch (error.response?.status) {
//       case 401:
//         // なにかする
// 				console.log(error);
//         break;
//       default:
//         break;
//     }
//     return Promise.reject(error)
//    }
//  );

export default basicAxios;
