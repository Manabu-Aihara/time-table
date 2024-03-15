import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TimelineEventProps } from "../lib/TimelineType";

const fetchAuthData = async () => {
	const authData = await axios.get(
		'http://127.0.0.1:8000/event/auth', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});
	return authData;
	// .then(res => res.json())
	// .then(json => console.log(`JSON: ${JSON.stringify(json)}`))
	// .catch(err => console.log(`ERROR: ${err}`));
}

export const fetchData = async (): Promise<TimelineEventProps[]> => {
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
	return data;
}
	// .then(res => res.json());
	// .then(json => console.log(json))
	// .catch(err => console.log(err));
  
export const useEventsQuery = () => {
	return useQuery({queryKey: ["events"], queryFn: fetchAuthData});
}
