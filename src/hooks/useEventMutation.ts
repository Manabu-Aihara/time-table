import { useMutation, useQueryClient } from "@tanstack/react-query";

import basicAxios from "../lib/AuthInfo";
import { TimelineEventProps } from "../lib/TimelineType";
import { useEventCache } from "../resources/cache";

// ⑦ mutationFn
// export const mutation = {
//   createTodo: (request: PostTodoRequest) => {
//     return todoApi.postTodo(request);
//   },
// };

export const useCreateMutation = () => {
  const eventCache = useEventCache();

  return useMutation({
    mutationFn: (timelineEvent: TimelineEventProps) => basicAxios.post(`/event/add`, timelineEvent),
    onSuccess: () => {
      return eventCache.invalidateList();
    }
  });
}

export const useUpdateMutation = (staffId: number) => {
  const queryClient = useQueryClient();
  const eventCache = useEventCache();

  return useMutation({
    mutationFn: (timelineEvent: TimelineEventProps) => basicAxios.post(`/event/update/${staffId}`, timelineEvent),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["item", staffId], data);
      console.log(`こっちが本命？: ${variables}`);
    },
  });  
}
