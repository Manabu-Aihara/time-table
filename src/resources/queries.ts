import { useCallback, useState, useReducer } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";

import { TokenProp } from "../lib/AppType";
import { TimelineEventProps } from "../lib/TimelineType";
import { fetchEventsData, fetchGetId, fetchGetResponse } from "../hooks/useFetch";
import { eventKeys, authKeys } from "./cache";
import { useAuthContext, useAuthDispatch } from "../hooks/useContextFamily";

export const useEventsQuery = () => {
	return useQuery({queryKey: ["events"], queryFn: fetchEventsData});
}

export const useTokenQuery = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);

  return useQuery({
    queryKey: ["auth"],
    queryFn: () => query.get('token')
  });
}

export const useAuthQuery = () => {
  const tokenContext = useAuthContext();

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  console.log(`Query token: ${tokenContext.accessToken}`);

  // 以下は恐ろしいことに…
  // const [tokenState, setTokenState] = useState<TokenProp>();
  // setTokenState({...tokenContext, accessToken: query.get('token')!});
  // const [state, dispatch] = useReducer((state: TokenProp, newState: Partial<TokenProp>) => ({ ...state, ...newState }),
  //   { accessToken: '' }
  // );
  // dispatch({accessToken: query.get('token')!});

	return useQuery({
		queryKey: ['user_id'],
		queryFn: () => fetchGetResponse(query.get('token')!),
    // select: useCallback((result: number) => {
    //   return result;
    // }, [])
	});
}

const useAllQuery = <TData = TimelineEventProps[]>(
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
