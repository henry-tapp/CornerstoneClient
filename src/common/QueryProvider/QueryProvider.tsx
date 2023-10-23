import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isApiBaseRespons as isApiBaseResponse } from "api/Api.types";
import React, { useMemo } from "react";
import { ApiProvider, retryPolicy } from "../../api";
import { QueryProviderProps } from "./QueryProvider.types";

const DefaultRefetchIntervalMillis = 15000;

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
        retry: retryPolicy,
        // Applying this globally to all queries means that if the response
        // is from our API and has the expires_in top level value, then all
        // uses of queries will obey it.
        refetchInterval: (data, query) => {
          if (data && isApiBaseResponse(data)) {
            if (data.expires_in) {
              // This logging introduces A-LOT of log noise! as it's called a-lot
              // loglevel.debug(
              //   "Query refetchInterval set to response data.expires_in * 1000",
              //   data.expires_in,
              //   query.queryKey
              // );
              return data.expires_in * 1000;
            }
          }

          // This logging introduces A-LOT of log noise! as it's called a-lot
          // loglevel.debug("Query refetchInterval set to default", query.queryKey);

          // Default case
          if (defaultRefetchIntervalMillis === null) {
            // NO default fallback desired
            return false;
          } else {
            const def = Number(process.env.REACT_APP_DEFAULT_REFETCH_MS);
            return (
              defaultRefetchIntervalMillis ??
              (isNaN(def) ? undefined : def) ??
              60000
            );
          }
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

