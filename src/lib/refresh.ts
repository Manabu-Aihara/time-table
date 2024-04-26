import { AxiosResponse } from "axios";

import { useAuthContext, useAuthDispatch } from "../hooks/useContextFamily";
import basicAxios from "./AuthInfo";

// const state = useAuthContext();
// const dispatch = useAuthDispatch();

export const refresh = async (prev: string): Promise<AxiosResponse<string>> => {
  // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
  const response = await basicAxios.get('/refresh', {
    headers: {
			'Access-Control-Allow-Origin': '*',
			'Authorization': `Bearer ${prev}`,
			'credentials': 'include' // ここを追加。
		}
  });
  // dispatch({
  //   type: 'UPDATE',
  //   retrieveToken: response.data.accessToken
  // });
  return response.data;
};
