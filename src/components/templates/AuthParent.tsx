import { ReactNode, createContext, useReducer, Dispatch, useState } from "react";

import { TokenProp } from "../../lib/AppType";
import { useAuthContext, useAuthDispatch } from "../../hooks/useContextFamily";

export const AuthStateContext = createContext<TokenProp | undefined>(undefined);

export type Action = {
  type: 'UPDATE';
  setAccessToken: TokenProp;
}

type AuthDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const AuthDispatchContext = createContext<AuthDispatch | undefined>(
  undefined
);

const useAuthReducer = (token: TokenProp, action: Action): TokenProp => {
  const next: TokenProp = token;

  switch(action.type){
    case 'UPDATE':
      token = action.setAccessToken;
      break;
    default:
      throw new Error('Invalid action');
  }
  console.log(`Next: ${JSON.stringify(next)}`);
  return token;
}

export const AuthProvider = ({children}: {children: ReactNode}) => {

  // const [token, setToken] = useState<TokenProp>({
  //   accessToken: '0123456789abcdef'
  // });
  // const [auth, dispatch] = useReducer(useAuthReducer, '');
  const token: TokenProp = {accessToken: '0123456789abcdef'};
  console.log(`Parent: ${JSON.stringify(token)}`);

  return (
    <AuthStateContext.Provider value={token}>
      {/* <AuthDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </AuthDispatchContext.Provider> */}
    </AuthStateContext.Provider>
  );
};

// export default AuthProvider;
