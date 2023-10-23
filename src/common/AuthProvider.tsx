/**
 * I'm not sure if this is the best way to handle this
 * long term but for now it at-least lets us use query
 * param passed in auth tokens.
 * By keeping the auth in this single context we can
 * change how it's provided (query string, local storage)
 * without needing to update any of the rest of the site.
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import loglevel from "util/log";

import { useAuth0 } from "@auth0/auth0-react";

interface AuthInstance {
  currentToken?: string;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  baseApiUrl: string;
}

const AuthContext = createContext<AuthInstance>({
  isAuthenticated: false,
});
AuthContext.displayName = "AuthProvider"; // Only used by the dev tools

export function AuthProvider({ children, baseApiUrl }: React.PropsWithChildren<AuthProviderProps>) {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [userMetadata, setUserMetadata] = useState(null);

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getUserMetadata = async () => {

      try {
        setAccessToken(await getAccessTokenSilently({
          authorizationParams: {
            audience: `${baseApiUrl}`,
            scope: "read:current_user",
          },
        }));

        const userDetailsByIdUrl = `${baseApiUrl}/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, setAccessToken, accessToken, baseApiUrl, user?.sub]);


  const authInstance = useMemo<AuthInstance>(() => {
    return {
      currentToken: accessToken ?? undefined,
      userMetadata: userMetadata,
      isAuthenticated: isAuthenticated
    };
  }, [accessToken, isAuthenticated, userMetadata]);

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
