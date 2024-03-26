import axios, { AxiosResponse } from "axios";

import { TimelineEventProps } from "../lib/TimelineType";
import { AuthGuardContext } from "../components/templates/AuthParent";
import basicAxios from "../lib/AuthInfo";
import { useAuthContext } from "./useContextFamily";

export const fetchEventsData = async (): Promise<TimelineEventProps[]> => {
	const { data } = await axios.request<TimelineEventProps[]>({
		url: 'http://127.0.0.1:8000/todo/all',
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			// mode: 'cors',
			// Accept: 'application/json',
			'Content-Type': 'application/json',
			// credentials: 'include' // ここを追加。
			// withCredentials: true
		}
	});
	console.log(`フェッチデータ: ${data}`);
	return data;
	// .then(res => res.json());
	// .then(json => console.log(json))
	// .catch(err => console.log(err));
}
  
export const fetchGetId = async (postToken: string): Promise<number> => {
	// cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
	const resultID: number = await basicAxios.post('/event/all', postToken,
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': `Bearer ${postToken}`,
				'credentials': 'include', // ここを追加。
			}
		});
	console.log(`とりあえず結果のID: ${JSON.stringify(resultID)}`);
	return resultID;
}

export const fetchGetResponse = async (postToken: string): Promise<AxiosResponse> => {
  // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
  const authResponse = await basicAxios.post<AxiosResponse>('/event/all', postToken,
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': `Bearer ${postToken}`,
				'credentials': 'include' // ここを追加。
			}
		});
  // ((prev: AuthGuardContext) => {
  //   // access_tokenを保持する
  //   return { ...prev, accessToken: authResponse.data };
  // });
	console.log(`フェッチデータ: ${authResponse}`);
  return authResponse.data;
};
