import { createContext, Dispatch, ReactNode, useReducer } from 'react';
<<<<<<< HEAD
import { Event } from 'react-big-calendar';
import moment from 'moment';

type Events = Event[];
=======
// import { Event } from 'react-big-calendar';
import { EventItem } from '../lib/EventItem';
import moment from 'moment';

type EventItems = EventItem[];
>>>>>>> origin/second

// * State専用 Context *
// 今後 Providerを使わない時にはContextの値がundefinedになる必要があるので, 
// Contextの値がEventsにもundefinedにもできるように宣言してください。
<<<<<<< HEAD
export const EventsStateContext = createContext<Events | undefined>(undefined);

type Action = 
  | { type: 'CREATE'; title: string }
  | { type: 'REMOVE'; title: string };
=======
export const EventsStateContext = createContext<EventItems | undefined>(undefined);

type Action = 
  | { type: 'CREATE'; payload: {title: ReactNode} }
  | { type: 'UPDATE'; payload: EventItem };
>>>>>>> origin/second

type EventsDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const EventsDispatchContext = createContext<EventsDispatch | undefined>(
  undefined
);

// * Reducer *
<<<<<<< HEAD
export function eventsReducer (state: Events, action: Action): Events {

  switch (action.type) {
    case 'CREATE':
      console.log("呼ばれました");
      return state.concat({
          title: action.title,
          start: new Date(),
          end: new Date(new Date().setHours(new Date().getHours() + 1)),    
        });
    // case 'REMOVE':
    //   return state.filter(state => state.title !== action.title);
=======
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
>>>>>>> origin/second
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
