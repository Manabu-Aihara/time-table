import authAxios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";

import { useAuthContext } from './useContextFamily';
import { refresh } from "../lib/refresh";
import basicAxios from "../lib/AuthInfo";

export const useAuthAxios = () => {

  // useContext(AuthStateContext);
  const state = useAuthContext();

  useEffect(() => {
    // リクエスト前に実行。headerに認証情報を付与する
    const requestIntercept = basicAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${state?.accessToken}`;
        }
        console.log(`initial token: ${JSON.stringify(state)}`)
        console.log(`headers: ${config.headers}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // レスポンスを受け取った直後に実行。もし認証エラーだった場合、再度リクエストする。
    const responseIntercept = basicAxios.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config;
        console.log(`Old token: ${prevRequest?.headers["Authorization"]}`);
        // 403認証エラー(headerにaccess_tokenがない。もしくはaccess_tokenが無効)
        if (error?.response?.status === 403/* && !prevRequest.sent*/) {
          // prevRequest.sent = true;
          // 新しくaccess_tokenを発行する
          const newAccessToken = await refresh();
          console.log(`New token: ${newAccessToken}`);
          prevRequest!.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // 再度実行する
          return basicAxios(prevRequest!);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // 離脱するときにejectする
      basicAxios.interceptors.request.eject(requestIntercept);
      basicAxios.interceptors.response.eject(responseIntercept);
    };
  }, [state]);

  return basicAxios;
};
