import axios from "axios";

import { AuthGuardContext } from "../components/templates/AuthParent";
import { useAuthContext, useAuthDispatch } from "../hooks/useContextFamily";
import basicAxios from "./AuthInfo";

// const state = useAuthContext();
// const dispatch = useAuthDispatch();

export const refresh = async () => {
  // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
  const response = await basicAxios.get<AuthGuardContext>("/refresh");
  ((prev: AuthGuardContext) => {
    // access_tokenを保持する
    return { ...prev, accessToken: response.data.accessToken };
  });
  // dispatch({
  //   type: 'UPDATE',
  //   retrieveToken: response.data.accessToken
  // });
  return response.data.accessToken;
};
