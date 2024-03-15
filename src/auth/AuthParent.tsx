import React, { ReactNode, createContext, useState } from "react";

type AuthGuardContext = {
  accessToken: string;
}

export const AuthContext = createContext<AuthGuardContext | undefined>(undefined);

const AuthProvider = (children : ReactNode) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
