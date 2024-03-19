import { useContext } from "react";

import { EventsStateContext, EventsDispatchContext } from "../components/EventsParent";
import { AuthStateContext, AuthDispatchContext } from "../auth/AuthParent";

export function useEventsState() {
  const state = useContext(EventsStateContext);
  if (!state) throw new Error('EventProvider not found');
  return state;
}
  
export function useEventsDispatch() {
  const dispatch = useContext(EventsDispatchContext);
  if (!dispatch) throw new Error('EventProvider not found');
  return dispatch;
}

export function useAuthContext() {
  const auth = useContext(AuthStateContext);
  if (!auth) throw new Error('AuthProvider not found');
  return auth;
}

export function useAuthDispatch() {
  const auth = useContext(AuthDispatchContext);
  if (!auth) throw new Error('AuthProvider not found');
  return auth;
}
