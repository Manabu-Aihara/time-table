import { AxiosError, AxiosResponse } from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useContextFamily';
import { refresh } from "../../lib/refresh";
import basicAxios from "../../lib/AuthInfo";
import { AuthGuardContext } from "./AuthParent";

export const AuthAxios = ({children}: {children: ReactNode}) => {
  // useContext(AuthStateContext);
  const state = useAuthContext();

  // const search = useLocation().search;

  useEffect(() => {
    // リクエスト前に実行。headerに認証情報を付与する
    const requestIntercept = basicAxios.interceptors.request.use(
      (config) => {
        if (config.headers["Authorization"] === '') {
          console.log("It's passed if!");
          config.headers["Authorization"] = `Bearer ${state?.accessToken}`;
        } else {
          console.log("It's passed else!");
          // const query = new URLSearchParams(search);
          // config.headers["Authorization"] = `Bearer ${query.get('token')}`;
        }
        console.log(`initial token: ${JSON.stringify(state)}`)
        console.log(`headers: ${config.headers}`);
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
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

  return (
    <>
      {children}
    </>
  );
};
