import { useCallback } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";

import { TimelineEventProps } from "../lib/TimelineType";
import { fetchEventsData, fetchGetId, fetchGetResponse } from "../hooks/useFetch";
import { eventKeys, authKeys } from "./cache";
import { useAuthContext } from "../hooks/useContextFamily";

export const useEventsQuery = () => {
	return useQuery({queryKey: ["events"], queryFn: fetchEventsData});
}

export const useAuthQuery = () => {
  // const { accessToken } = useAuthContext();
  const search = useLocation().search;
  const query = new URLSearchParams(search);

  console.log(`存在するかトークン: ${query.get('token')}`);

	return useQuery({
		queryKey: authKeys.pull(query.get('token')!),
		queryFn: () => fetchGetResponse(query.get('token')!),
    // select: useCallback((result: number) => {
    //   return result;
    // }, [])
	});
}

export const useAllQuery = <TData = TimelineEventProps[]>(
  options?: Omit<
    UseQueryOptions<TimelineEventProps[], AxiosError, TData, typeof eventKeys.all>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({queryKey: eventKeys.all, queryFn: fetchEventsData, ...options});
};

// type UtilOption<TData = TimelineEventProps[]> = {
//   options?: Omit<
//     UseQueryOptions<TimelineEventProps[], AxiosError, TData, [string, (Record<string, unknown> | string)?]>,
//     "queryKey" | "queryFn"
//   >
// }

// export const useApi = <
//   TQueryKey extends [string, (Record<string, unknown> | string)?],
//   TQueryFnData,
//   TError,
//   TData = TQueryFnData,
// >(
//   queryKey: TQueryKey,
//   fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
//   options?: Omit<
//     UseQueryOptions<unknown, TError, TData, TQueryKey>,
//     'queryKey' | 'queryFn'
//   >,
// ) => {
//   // accessTokenを何らかの形で取得する
//   const { accessToken } = useAuthGuardContext();

//   return useQuery({
//     queryKey,
//     queryFn: async () => fetcher(queryKey[1], accessToken || ''),
//     ...options,
//   });
// };
