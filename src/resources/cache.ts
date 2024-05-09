import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

// ① Query Key
// queries.ts がある場合に必要に応じて宣言
export const eventKeys = {
  all: ["events"] as const,
  list: () => [...eventKeys.all, "list"] as const,
  groupList: (group?: number) => [...eventKeys.list(), group] as const,
  detail: (id: number) => [...eventKeys.all, "detail", id] as const,
};

export const authKeys = {
  auth: ["auth"] as const,
  pull: (searchKey: string) => [...authKeys.auth, "userID", {searchKey}] as const,
  // pulls: () => [...authKeys.all, "detail"] as const,
  verify: (token: string) => [...authKeys.auth, "detail", {token}] as const
}
// ② キャッシュ操作のためのカスタムフック
// mutations.ts がある場合に必要に応じて宣言
export function useEventCache() {
  const queryClient = useQueryClient();

  return useMemo(
    () => ({
      invalidateList: () => queryClient.invalidateQueries({queryKey: eventKeys.list()}),
      invalidGroupList: (group: number) =>
        queryClient.invalidateQueries({queryKey: eventKeys.groupList(group)}),
      invalidateDetail: (id: number) =>
        queryClient.invalidateQueries({queryKey: eventKeys.detail(id)}),
    }),
    [queryClient]
  );
}

export const useAuthCache = () => {
  const queryClient = useQueryClient();

  return useMemo(() => ({
    invalidateSearch: (search: string) =>
      queryClient.invalidateQueries({queryKey: authKeys.pull(search)}),
    invalidateVerify: (token: string) =>
      queryClient.invalidateQueries({queryKey: authKeys.verify(token)})
  }), [queryClient]);
}
