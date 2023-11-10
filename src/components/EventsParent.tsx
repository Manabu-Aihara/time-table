import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Event } from 'react-big-calendar';

type Events = Event[];

// * State専用 Context *
// 今後 Providerを使わない時にはContextの値がundefinedになる必要があるので, 
// Contextの値がEventsにもundefinedにもできるように宣言してください。
export const EventsStateContext = createContext<Events | undefined>(undefined);

type Action = 
  | { type: 'CREATE'; title: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; title: string };

type EventsDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const EventsDispatchContext = createContext<EventsDispatch | undefined>(
  undefined
);

// * Reducer *
function eventsReducer(state: Events, action: Action): Events {
  switch (action.type) {
    case 'CREATE':
      // const nextId = Math.max(...state.map(todo => todo.id)) + 1;
      return state.concat({
        title: action.title,
        start: new Date(),
        end: new Date(new Date().setHours(new Date().getHours() + 1)),    
      });
    // case 'REMOVE':
    //   return state.filter(state => state.title !== action.title);
    default:
      throw new Error('Invalid action');
  }
}

export function EventsContextProvider({ children }: { children: ReactNode }) {
  const [events, dispatch] = useReducer(eventsReducer, []);

  return (
		<EventsDispatchContext.Provider value={dispatch}>
			<EventsStateContext.Provider value={events}>
				{children}
			</EventsStateContext.Provider>
		</EventsDispatchContext.Provider>
  );
}
