import { useQuery, UseQueryOptions } from "@tanstack/react-query";
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
