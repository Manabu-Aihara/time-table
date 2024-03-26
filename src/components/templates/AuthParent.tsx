import { ReactNode, createContext, useReducer, Dispatch, useState } from "react";

import { useAuthContext } from "../../hooks/useContextFamily";

export type AuthGuardContext = {
  accessToken: string;
  retrieveInfo: (token: string) => number;
  // children: ReactNode;
}

export const AuthStateContext = createContext<AuthGuardContext | undefined>(undefined);

export type Action = {
  type: 'UPDATE';
  setToken: string;
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
      authState.accessToken = action.setToken;
      break;
    default:
      throw new Error('Invalid action');
  }
  console.log(`Next: ${JSON.stringify(next)}`);
  return authState;
}

export const AuthProvider = ({children}: {children: ReactNode}) => {

  // const { accessToken, retrieveInfo, children } = props;
  // const [auth, setAuth] = useState<AuthGuardContext>();
  // const [auth, dispatch] = useReducer(useAuthReducer, {
  //   accessToken: ''
  // });
  const initialState: AuthGuardContext = {
    accessToken: '',
    retrieveInfo: () => 0
  }

  return (
    <AuthStateContext.Provider value={initialState}>
      {/* <AuthDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </AuthDispatchContext.Provider> */}
    </AuthStateContext.Provider>
  );
};

// export default AuthProvider;
