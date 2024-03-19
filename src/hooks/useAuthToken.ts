import authAxios from "axios";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

// import useRefreshToken from "./useRefreshToken";
import { useAuthContext, useAuthDispatch } from './useContextFamily';

export const useAuthAxios = () => {
  // const refresh = useRefreshToken();

  // useContext(AuthStateContext);
  const state = useAuthContext();
  // useContext(AuthDispatchContext);
  const dispatch = useAuthDispatch();

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  // const auth_page = `/?token=${query.get('token')}`
  // console.log(`渡されるトークン: ${query.get('token')}`);

  dispatch({
    type: 'UPDATE',
    retrieveToken: query.get('token')!
  });

  useEffect(() => {
    // リクエスト前に実行。headerに認証情報を付与する
    const requestIntercept = authAxios.interceptors.request.use(
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
    // const responseIntercept = authAxios.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const prevRequest = error?.config;
    //     // 403認証エラー(headerにaccess_tokenがない。もしくはaccess_tokenが無効)
    //     if (error?.response?.status === 403 && !prevRequest.sent) {
    //       prevRequest.sent = true;
    //       // 新しくaccess_tokenを発行する
    //       const newAccessToken = await refresh();
    //       prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    //       // 再度実行する
    //       return authAxios(prevRequest);
    //     }
    //     return Promise.reject(error);
    //   }
    // );

    return () => {
      // 離脱するときにejectする
      authAxios.interceptors.request.eject(requestIntercept);
      // authAxios.interceptors.response.eject(responseIntercept);
    };
  }, [state]);

  return authAxios;
};
