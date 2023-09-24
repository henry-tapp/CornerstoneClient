/**
 * I'm not sure if this is the best way to handle this
 * long term but for now it at-least lets us use query
 * param passed in auth tokens.
 * By keeping the auth in this single context we can
 * change how it's provided (query string, local storage)
 * without needing to update any of the rest of the site.
 */

import React, { createContext, useContext, useEffect, useMemo } from "react";
import loglevel from "util/log";

import { useAppArguments } from "./AppArgumentsProvider";

interface QsmartAuthInstance {
  currentToken?: string;
  isLoggedIn: boolean;
}

const AuthContext = createContext<QsmartAuthInstance>({
  isLoggedIn: false,
});
AuthContext.displayName = "AuthProvider"; // Only used by the dev tools

export function AuthProvider({ children }: React.PropsWithChildren<unknown>) {
  const { authToken } = useAppArguments();

  const authInstance = useMemo<QsmartAuthInstance>(() => {
    return {
      currentToken: authToken ?? undefined,
      isLoggedIn: !!authToken,
    };
  }, [authToken]);

  useEffect(() => {
    loglevel.debug("AuthProvider Config Update", authInstance);
  }, [authInstance]);

  return (
    <AuthContext.Provider value={authInstance}>{children}</AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

// Hook to use the context
export function useAuth() {
  return useContext(AuthContext);
}
