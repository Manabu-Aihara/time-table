import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

// ① Query Key
// queries.ts がある場合に必要に応じて宣言
export const eventKeys = {
  all: ["events"] as const,
  list: () => [...eventKeys.all, "list"] as const,
  paginateList: (page?: number) => [...eventKeys.list(), { page }] as const,
  detail: (id: number) => [...eventKeys.all, "detail", id] as const,
};

// ② キャッシュ操作のためのカスタムフック
// mutations.ts がある場合に必要に応じて宣言
export function useEventCache() {
  const queryClient = useQueryClient();

  return useMemo(
    () => ({
      invalidateList: () => queryClient.invalidateQueries({queryKey: eventKeys.list()}),
      invalidateDetail: (id: number) =>
        queryClient.invalidateQueries({queryKey: eventKeys.detail(id)}),
    }),
    [queryClient]
  );
}