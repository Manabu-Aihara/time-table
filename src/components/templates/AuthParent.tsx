import { ReactNode, createContext, useReducer, Dispatch, useState } from "react";

import { TokenProp } from "../../lib/AppType";
import { useTokenQuery } from "../../resources/queries";

export const AuthStateContext = createContext<TokenProp | undefined>(undefined);

export type Action = {
  type: 'UPDATE';
  payload: {accessToken: string};
}

type AuthDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const AuthDispatchContext = createContext<AuthDispatch | undefined>(
  undefined
);

const useAuthReducer = (tokenProp: TokenProp, action: Action): TokenProp => {
  switch(action.type){
    case 'UPDATE':
      return {...tokenProp, accessToken: action.payload.accessToken}
    default:
      throw new Error('Invalid action');
  }
}

export const AuthProvider = ({children}: {children: ReactNode}) => {

  // const [token, setToken] = useState<TokenProp>({
  //   accessToken: '0123456789abcdef'
  // });
  // const [auth, dispatch] = useReducer(useAuthReducer, {
  //   accessToken: '0123456789abcdef'
  // });
  const _auth = {accessToken: '0123456789abcdef'};

  const { data } = useTokenQuery();
  const auth: TokenProp = {accessToken: data!};
  console.log(`Parent: ${JSON.stringify(auth)}`);

  return (
    <AuthStateContext.Provider value={auth}>
      {/* <AuthDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </AuthDispatchContext.Provider> */}
    </AuthStateContext.Provider>
  );
};

// export default AuthProvider;
