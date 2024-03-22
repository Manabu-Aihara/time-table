import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { TimelineEventProps } from "../lib/TimelineType";
import { AuthGuardContext } from "../components/templates/AuthParent";

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
  
export const useEventsQuery = () => {
	return useQuery({queryKey: ["events"], queryFn: fetchEventsData});
}

export const fetchAuthData = async (): Promise<AuthGuardContext> => {
  // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
  const authData: AuthGuardContext = await axios.get('http://127.0.0.1:8000/refresh',
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'credentials': 'include', // ここを追加。
				'withCredentials': true
		}
		});
  ((prev: AuthGuardContext) => {
    // access_tokenを保持する
    return { ...prev, accessToken: authData.accessToken };
  });
	console.log(`フェッチデータ: ${JSON.stringify(authData)}`);
  return authData;
};

const fetchAuthResponse = async (): Promise<AxiosResponse<AuthGuardContext>> => {
  // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
  const authResponse = await axios.get<AxiosResponse<AuthGuardContext>>('http://127.0.0.1:8000/refresh',
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
				// credentials: 'include' // ここを追加。
				// withCredentials: true
		}
		});
  ((prev: AuthGuardContext) => {
    // access_tokenを保持する
    return { ...prev, accessToken: authResponse.data };
  });
	console.log(`フェッチデータ: ${authResponse}`);
  return authResponse.data;
};

export const useAuthQuery = () => {
	return useQuery({queryKey: ["auth"], queryFn: fetchAuthData})
}
