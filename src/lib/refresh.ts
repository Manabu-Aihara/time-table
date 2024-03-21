import axios from "axios";

import { AuthGuardContext } from "../components/templates/AuthParent";
import { useAuthContext, useAuthDispatch } from "../hooks/useContextFamily";

// const state = useAuthContext();
// const dispatch = useAuthDispatch();

export const refresh = async () => {
  // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
  const response = await axios.get<AuthGuardContext>("/refresh", {
    withCredentials: true,
  });
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
