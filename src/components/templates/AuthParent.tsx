import { ReactNode, createContext, useReducer, Dispatch } from "react";

import { AuthGuardContext } from "../../lib/AppType";
import { useAuthContext } from "../../hooks/useContextFamily";
import { useAuthQuery } from "../../resources/queries";

export const AuthStateContext = createContext<AuthGuardContext | undefined>(undefined);

export type Action = {
  type: 'UPDATE';
  setId: number;
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
      authState.auth_id = action.setId;
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
  const auth = useAuthContext();
  // const { data } = useAuthQuery()

  return (
    <AuthStateContext.Provider value={auth}>
      {/* <AuthDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </AuthDispatchContext.Provider> */}
    </AuthStateContext.Provider>
  );
};

// export default AuthProvider;
