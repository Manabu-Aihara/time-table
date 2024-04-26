import { AxiosError, AxiosResponse } from "axios";
import { ReactNode, useEffect } from "react";

import { useAuthContext } from '../../hooks/useContextFamily';
import { refresh } from "../../lib/refresh";
import basicAxios from "../../lib/AuthInfo";

export const AuthAxios = ({children}: {children: ReactNode}) => {
  // useContext(AuthStateContext);
  const authContext = useAuthContext();
  console.log(`Client provider: ${JSON.stringify(authContext)}`);
  const tokenContext = authContext.type === 'token' ? authContext.accessToken : undefined;  

  useEffect(() => {
    // リクエスト前に実行。headerに認証情報を付与する
    const requestIntercept = basicAxios.interceptors.request.use(
      (config) => {
        if (config.headers["Authorization"] === `Bearer ${null}`) {
          console.log("It's passed if!");
          config.headers["Authorization"] = `Bearer ${tokenContext}`;
        } else {
          console.log("It's passed else!");
          // const newAccessToken = refresh(auth.accessToken!);
          // config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          config.headers["Authorization"] = `Bearer ${tokenContext}`;
        }
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
          // 判別可能なユニオン型 (discriminated union)
          // https://typescriptbook.jp/reference/values-types-variables/discriminated-union
          if('accessToken' in authContext){
            // 新しくaccess_tokenを発行する
            const newAccessToken = await refresh(authContext.accessToken!);
            console.log(`New token: ${newAccessToken}`);
            prevRequest!.headers["Authorization"] = `Bearer ${newAccessToken.data}`;
            // 再度実行する
            return basicAxios(prevRequest!);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // 離脱するときにejectする
      basicAxios.interceptors.request.eject(requestIntercept);
      basicAxios.interceptors.response.eject(responseIntercept);
    };
  }, [authContext]);

  return (
    <>
      {children}
    </>
  );
};
