import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchData } from "../hooks/useFetch";
import { eventKeys } from "./cache";
import { TimelineEventProps } from "../lib/TimelineType";

export const useAllQuery = <TData = TimelineEventProps[]>(
  options?: Omit<
    UseQueryOptions<TimelineEventProps[], AxiosError, TData, typeof eventKeys.all>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({queryKey: eventKeys.all, queryFn: fetchData, ...options});
};

type UtilOption<TData = TimelineEventProps[]> = {
  options?: Omit<
    UseQueryOptions<TimelineEventProps[], AxiosError, TData, [string, (Record<string, unknown> | string)?]>,
    "queryKey" | "queryFn"
  >
}

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
