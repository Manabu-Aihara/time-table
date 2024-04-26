import { ReactNode, createContext, useReducer, Dispatch, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { Auth } from "../../lib/TimelineType";
import { useSearchQuery } from "../../resources/queries";

export const AuthStateContext = createContext<Auth | undefined>(undefined);

export type Action = {
  type: 'UPDATE';
  payload: {
    token: string
  };
}

type AuthDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const AuthDispatchContext = createContext<AuthDispatch | undefined>(
  undefined
);

// const useAuthReducer = (token: Auth, action: Action): Auth => {
//   switch(action.type){
//     case 'UPDATE':
//       return {...token, type: 'token', accessToken: action.payload.token}
//     default:
//       throw new Error('Invalid action');
//   }
// }

export const AuthProvider = ({children}: {children: ReactNode}) => {

  // const [token, setToken] = useState<TokenProp>({
  //   accessToken: '0123456789abcdef'
  // });
  // const [auth, dispatch] = useReducer(useAuthReducer, '');
  // console.log(`Parent: ${JSON.stringify(data)}`);
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const { data } = useSearchQuery('token');
  const _auth: Auth = { accessToken: data!, type: 'token' }

  return (
    <AuthStateContext.Provider value={_auth}>
      {/* <AuthDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </AuthDispatchContext.Provider> */}
    </AuthStateContext.Provider>
  );
};

// export default AuthProvider;
