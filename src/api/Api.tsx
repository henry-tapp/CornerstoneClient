import Axios from "axios";
import loglevel from "loglevel";
// import log from "loglevel";
import React, { createContext, useContext, useMemo } from "react";

import {
  AxiosRequestProcessor,
  FetchRequestProcessor,
  RequestProcessor,
} from "./RequestProcessors";
import { ApiProviderCore, ApiProviderProps } from "./Api.types";

const ApiContext = createContext<RequestProcessor>(undefined as any);

/**
 * An alternative to using the `useApiProvider` hook, this consumer
 * can be used to use the apps single ApiProvider and access the API
 * methods.
 */
export const ApiConsumer = ApiContext.Consumer;

const requestProcessorFactory = (
  coreProviderName: ApiProviderCore,
  props: ApiProviderProps
): RequestProcessor => {
  loglevel.info(
    `ApiProvider RequestProcessorFactory (${coreProviderName})`,
    props
  );

  const authHeaders: Record<string, string> = {};
  if (props.authToken) {
    authHeaders["Authorization"] = `${props.authMethod ?? "Bearer"} ${props.authToken
      }`;
  }

  switch (coreProviderName) {
    case "fetch":
      loglevel.info(`ApiProvider creating fetch provider.`);

      return new FetchRequestProcessor(props.baseApiUrl, {
        "Content-Type": "application/json",
        "Client-ID": props.clientId,
        "Accept-Language": props.culture ?? "",
        ...authHeaders,
      });

    case "axios":
      loglevel.info(`ApiProvider creating axios provider.`);

      return new AxiosRequestProcessor(props.baseApiUrl, {
        "Content-Type": "application/json",
        "Client-ID": props.clientId,
        "Accept-Language": props.culture ?? "",
        ...authHeaders,
      });

    default:
      throw new Error("Invalid RequestProcessor requested from factory");
  }
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

  const requestProcessor = useMemo(
    () => requestProcessorFactory(coreProviderName, propsWithoutChildren),
    [coreProviderName, propsWithoutChildren]
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
    if (error.response?.status === 404) {
      return false;
    }
  }
  // Retry a few times in-case it's just network issues
  return failureCount < 3;
};
