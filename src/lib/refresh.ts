import { AccessToken } from "./AppType";
import { useAuthContext, useAuthDispatch } from "../hooks/useContextFamily";
import basicAxios from "./AuthInfo";
import { AxiosResponse } from "axios";

// const state = useAuthContext();
// const dispatch = useAuthDispatch();

export const refresh = async (): Promise<AxiosResponse<string>> => {
  // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
  const response = await basicAxios.get("/refresh");
  ((prev: AccessToken) => {
    // access_tokenを保持する
    return { prev, accessToken: response.data };
  });
  // dispatch({
  //   type: 'UPDATE',
  //   retrieveToken: response.data.accessToken
  // });
  return response.data;
};
