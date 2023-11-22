import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Axios from "axios";
import React, { useMemo } from "react";
import { ApiProvider } from "../../api";
import { QueryProviderProps } from "./QueryProvider.types";

const DefaultRefetchIntervalMillis = 15000;

const MAX_RETRIES = 3;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

const internalQueryClient = (defaultRefetchIntervalMillis?: number | null) =>
  new QueryClient({
    defaultOptions: {
      mutations: {
        useErrorBoundary: (error) => {
          // https://tkdodo.eu/blog/react-query-error-handling
          // Only server errors will go to the Error Boundary
          return (error as any)?.response?.status >= 500;
        },
      },
      queries: {
        useErrorBoundary: (error, query) => {
          // https://tkdodo.eu/blog/react-query-error-handling
          // Only server errors will go to the Error Boundary
          return (error as any)?.response?.status >= 500;
        },
        // This default retry policy is applied to all queries and if a
        // specific one needs to override it, it can do so locally where
        // that query is called.
        // This is important so our tests run as we need to fully disable
        // retries in tests.
        retry: (failureCount, error) => {
          if (failureCount > MAX_RETRIES) {
            return false;
          }

          if (
            Axios.isAxiosError(error) &&
            HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)
          ) {
            console.log(`Aborting retry due to ${error.response?.status} status`);
            return false;
          }

          return true;
        },
      },
    },
  });


export function QueryProvider(props: React.PropsWithChildren<QueryProviderProps>) {
  const {
    children,
    apiUrl,
    authMethod
  } = props;

  const queryClient = useMemo(
    () =>
      internalQueryClient(DefaultRefetchIntervalMillis),
    []
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApiProvider
          authMethod={authMethod}
          baseApiUrl={apiUrl}
        >
          {children}
        </ApiProvider>
      </QueryClientProvider>
    </>
  );
}

