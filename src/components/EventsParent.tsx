import { createContext, Dispatch, ReactNode, useReducer } from 'react';
// import { Event } from 'react-big-calendar';
import { EventItem } from '../lib/EventItem';
import moment from 'moment';

type EventItems = EventItem[];

// * State専用 Context *
// 今後 Providerを使わない時にはContextの値がundefinedになる必要があるので, 
// Contextの値がEventsにもundefinedにもできるように宣言してください。
export const EventsStateContext = createContext<EventItems | undefined>(undefined);

type Action = 
  | { type: 'CREATE'; payload: {title: ReactNode} }
  | { type: 'UPDATE'; payload: EventItem };

type EventsDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const EventsDispatchContext = createContext<EventsDispatch | undefined>(
  undefined
);

// * Reducer *
export function eventsReducer (eventState: EventItems, action: Action): EventItems {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE':
      return eventState.concat({
          title: payload.title,
          start: new Date(),
          end: new Date(new Date().setHours(new Date().getHours() + 1)),    
        });
    case 'UPDATE':
      return eventState.map(evt => evt.title === action.payload.title ? action.payload : evt)
    default:
      throw new Error('Invalid action');
  }
}

export const EventsContextProvider = ({ children }: { children: ReactNode }) => {
  const [events, dispatch] = useReducer(eventsReducer, [
    {
      title: 'Learn cool stuff',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate()
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
