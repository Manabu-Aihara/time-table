import { useContext } from "react";

import { EventsStateContext, EventsDispatchContext } from "../components/EventContext";

export function useEventsState() {
    const state = useContext(EventsStateContext);
    if (!state) throw new Error('TodosProvider not found');
    return state;
  }
  
  export function useEventsDispatch() {
    const dispatch = useContext(EventsDispatchContext);
    if (!dispatch) throw new Error('TodosProvider not found');
    return dispatch;
  }
  