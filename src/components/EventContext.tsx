import { createContext, Dispatch, ReactNode, useReducer, useContext } from 'react';

import { EventState } from './InputForm';
// export type Todo = {
// 	id?: number,
// 	summary: string,
// 	owner: string,
// 	done: boolean
// }
// type TodosState = Todo[];
type EventsState = EventState[];

// * State専用 Context *
// 今後 Providerを使わない時にはContextの値がundefinedになる必要があるので, 
// Contextの値がTodosStateにもundefinedにもできるように宣言してください。
const EventsStateContext = createContext<EventsState | undefined>(undefined);

type Action = 
  | { type: 'CREATE'; title: string }
  // | { type: 'CREATE'; id: number, summary: string, owner: string, done: boolean }
  | { type: 'TOGGLE'; id: number }
  // | { type: 'REMOVE'; id: number };
  | { type: 'REMOVE'; title: string };

type EventsDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
const EventsDispatchContext = createContext<EventsDispatch | undefined>(
  undefined
);

// * Reducer *
function eventsReducer(state: EventsState, action: Action): EventsState {
  switch (action.type) {
    case 'CREATE':
      // const nextId = Math.max(...state.map(todo => todo.id)) + 1;
      return state.concat({
				// id: action.id,
        // summary: action.summary,
				// owner: action.owner,
        // done: false
        title: action.title
      });
    // case 'TOGGLE':
    //   return state.map(todo =>
    //     todo.id === action.id ? { ...todo, done: !todo.done } : todo
    //   );
    // case 'REMOVE':
    //   return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error('Invalid action');
  }
}


// TodosStateContextとTodosDispatchContextのProviderを一緒に使います。 
export function EventsContextProvider({ children }: { children: ReactNode }) {
  const [events, dispatch] = useReducer(eventsReducer, [
    // {
    //   summary: 'Context APIを勉強する',
    //   owner: 'Ken',
    //   done: true
    // },
    // {
    //   summary: 'TypeScriptを勉強する',
    //   owner: 'Ken',
    //   done: true
    // },
    // {
    //   summary: 'TypeScriptでContext APIを使ってみる',
    //   owner: 'Ken',
    //   done: false
    // }
    {
      title: 'Toilet'
    }
  ]);

  return (
		<EventsDispatchContext.Provider value={dispatch}>
			<EventsStateContext.Provider value={events}>
				{children}
			</EventsStateContext.Provider>
		</EventsDispatchContext.Provider>
  );
}

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
