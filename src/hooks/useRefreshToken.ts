import axios from "axios";

import { AuthGuardContext, AuthDispatchContext } from "../auth/AuthParent";
import { useAuthContext, useAuthDispatch } from "./useContextFamily";

const dispatch = useAuthDispatch();

export const refresh = async () => {
  // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
  const response = await axios.get<AuthGuardContext>("/refresh", {
    withCredentials: true,
  });
  // state((prev: AuthGuardContext) => {
  //   // access_tokenを保持する
  //   return { ...prev, accessToken: response.data.accessToken };
  // });
  dispatch({
    type: 'UPDATE',
    retrieveToken: response.data.accessToken
  });
};
