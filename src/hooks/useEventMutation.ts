import { useMutation } from "@tanstack/react-query"
import basicAxios from "../lib/AuthInfo"
import { TimelineEventProps } from "../lib/TimelineType"
import { useEventCache } from "../resources/cache"
import { AuthNumber } from "../lib/AppType"

// ⑦ mutationFn
// export const mutation = {
//   createTodo: (request: PostTodoRequest) => {
//     return todoApi.postTodo(request);
//   },
// };

export const useCreateMutation = (staffId: AuthNumber) => {
  const eventCache = useEventCache();

  return useMutation({
    mutationFn: (timelineEvent: TimelineEventProps) => basicAxios.post(`/event/add/${staffId}`, timelineEvent),
    // onSuccess: () => {
    //   return eventCache.invalidGroupList(staffId);
    // }
  });
}
