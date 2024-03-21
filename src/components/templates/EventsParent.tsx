import { createContext, Dispatch, ReactNode, useReducer } from 'react';

import moment from 'moment';

// import { EventItem } from '../lib/EventItem';
import { TimelineEventProps } from '../../lib/TimelineType';
import { timelineEventsReducer } from '../../lib/reducer';

// type EventItems = EventItem[];
export type TimelineEventPropsList = TimelineEventProps[]

// * State専用 Context *
// 今後 Providerを使わない時にはContextの値がundefinedになる必要があるので, 
// Contextの値がEventsにもundefinedにもできるように宣言してください。
export const EventsStateContext = createContext<TimelineEventPropsList | undefined>(undefined);

export type Action = 
  | { type: 'CREATE'; payload: {
      id: number,
      staff_id: number,
      group: number,
      title: ReactNode
      }
    }
  | { type: 'UPDATE'; payload: TimelineEventProps };

type EventsDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const EventsDispatchContext = createContext<EventsDispatch | undefined>(
  undefined
);

export const EventsContextProvider = ({ children }: { children: ReactNode }) => {
  const [events, dispatch] = useReducer(timelineEventsReducer, [
    {
      id: 0,
      staff_id: 1000,
      group: 0,
      title: 'Learn cool stuff',
      start_time: moment().toDate(),
      end_time: moment().add(1, 'hours').toDate()
    },
  ]);

  return (
    <EventsStateContext.Provider value={events}>
      <EventsDispatchContext.Provider value={dispatch}>
				{children}
      </EventsDispatchContext.Provider>
    </EventsStateContext.Provider>
  );
}
