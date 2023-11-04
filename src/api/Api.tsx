import Axios from "axios";
import loglevel from "loglevel";
// import log from "loglevel";
import React, { createContext, useContext, useEffect, useMemo } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { User } from "types/User";
import { ApiProviderCore, ApiProviderProps, RequestProcessorProps } from "./Api.types";
import {
  AxiosRequestProcessor,
  RequestProcessor
} from "./RequestProcessors";

const ApiContext = createContext<RequestProcessor>(undefined as any);

/**
 * An alternative to using the `useApiProvider` hook, this consumer
 * can be used to use the apps single ApiProvider and access the API
 * methods.
 */
export const ApiConsumer = ApiContext.Consumer;

const requestProcessorFactory = (
  coreProviderName: ApiProviderCore,
  props: RequestProcessorProps
): RequestProcessor => {
  loglevel.info(
    `ApiProvider RequestProcessorFactory (${coreProviderName})`,
    props
  );

  const headers: Record<string, string> = {};
  if (props.accessToken) {
    headers["Authorization"] = `${props.authMethod ?? "Bearer"} ${props.accessToken}`;
  }

  if (props.userId) {
    headers["UserId"] = `${props.userId}`;
  }

  if (props.planId) {
    headers["PlanId"] = `${props.planId}`;
  }

  loglevel.info(`ApiProvider creating axios provider.`);

  return new AxiosRequestProcessor(props.handleRefresh, props.baseApiUrl, {
    "Content-Type": "application/json",
    "Accept-Language": "en-US" ?? "",
    "Access-Control-Allow-Origin": "*",
    ...headers,
  });
};

/**
 * A wrapper provider component to wrap the entire app in and provide
 * the shared axios instance to the whole application, allowing us
 * to manage auth and global settings centrally.
 */
export function ApiProvider(props: React.PropsWithChildren<ApiProviderProps>) {
  const { core, baseApiUrl } = props;
  const { children, ...propsWithoutChildren } = props;

  if (!baseApiUrl) {
    throw new Error("No valid API available.");
  }

  const coreProviderName = useMemo(() => core ?? "axios", [core]);

  const { user, isLoading, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  const [accessToken, setAccessToken] = useLocalStorage("jwt", "");

  const [planId, setPlanId] = useLocalStorage("planId", "");

  const [userId, setUserId] = useLocalStorage("userId", "");

  useEffect(() => {
    const getUserMetadata = async () => {

      try {
        const newAccessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `${baseApiUrl}`,
          },
        });

        if (user && !isLoading && isAuthenticated && newAccessToken) {

          setAccessToken(newAccessToken);

          if (userId === "") {

            const metadataResponse = await fetch(encodeURI(`${baseApiUrl}user/${user?.name}`), {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });

            if (metadataResponse.status === 200) {
              var userDetails = await metadataResponse.json() as User;
              setUserId(userDetails.id);
            }

            if (metadataResponse.status >= 400) {
              logout();
            }
          }
        }

      } catch (e: any) {
        console.log(e.message);
      }
    };

    getUserMetadata();

  }, [getAccessTokenSilently, baseApiUrl, accessToken, user, userId, logout, isLoading, isAuthenticated, setPlanId, setUserId, setAccessToken]);

  const requestProcessor = useMemo(
    () => requestProcessorFactory(coreProviderName, { accessToken: accessToken, userId, planId, ...propsWithoutChildren, handleRefresh: getAccessTokenSilently }),
    [coreProviderName, propsWithoutChildren, accessToken, getAccessTokenSilently, userId, planId]
  );

  return (
    <ApiContext.Provider value={requestProcessor}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiProvider() {
  return useContext(ApiContext);
}

/**
 * A function that given a HTTP status code, determines if the request
 * was considered valid.
 *
 * Use cases include wanting to process 400 responses as successful and use
 * the response data accordingly.
 *
 * Example:
 * ```
 * (status) => (status >= 200 && status < 300) || status === 400
 * ```
 */
export type ValidateStatusFunc = (status: number) => boolean;

/**
 * Options for general/abstracted API calls.
 */
export type GenericRequestOptions = {
  /**
   * An optional function that is used to check if a response is
   * considered valid.
   */
  validateStatus?: ValidateStatusFunc;
};

/**
 * The default retry policy used by the API throughout the app/components.
 *
 * This can be overriden for specific queries by passing a `retry` option
 *
 * @param failureCount How many failures have there been so far
 * @param error If there is an error then it is included here.
 * @returns true if the request should be retried again, otherwise false.
 */
export const retryPolicy = (failureCount: number, error: unknown) => {
  if (Axios.isAxiosError(error)) {
    if (error.response?.status === 404 || error.response?.status === 401) {
      return false;
    }
  }
  // Retry a few times in-case it's just network issues
  return failureCount < 3;
};
