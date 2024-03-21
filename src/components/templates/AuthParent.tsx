import { ReactNode, createContext, useReducer, Dispatch, useState } from "react";
import { useLocation } from 'react-router-dom';

// import { useGetSearch } from "../../lib/search";

export type AuthGuardContext = {
  accessToken: string;
}

export const AuthStateContext = createContext<AuthGuardContext | undefined>(undefined);

export type Action = {
  type: 'UPDATE';
  retrieveToken: string;
}

type AuthDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const AuthDispatchContext = createContext<AuthDispatch | undefined>(
  undefined
);

const useAuthReducer = (authState: AuthGuardContext, action: Action): AuthGuardContext => {
  const next: AuthGuardContext = {...authState};

  switch(action.type){
    case 'UPDATE':
      authState.accessToken = action.retrieveToken;
      break;
    default:
      throw new Error('Invalid action');
  }
  console.log(`Next: ${JSON.stringify(next)}`);
  return authState;
}

export const AuthProvider = ({children}: {children : ReactNode}) => {

  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const [auth, dispatch] = useReducer(useAuthReducer, {
    accessToken: ''
  });
  // const [auth, setAuth] = useState<AuthGuardContext>()

  return (
    <AuthStateContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// export default AuthProvider;
