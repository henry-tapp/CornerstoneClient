import React, { useMemo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ApiProvider, retryPolicy } from "../../api";
import { isApiBaseResponse } from "api/Api.types";

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

/**
 * A wrapper component that contains all the required setup / contexts etc for the
 * Qsmart NextGen components to function. This also sets up bits like the automated
 * query refetching based on API response expiries (or a fallback).
 *
 * This must be included in and wrap any project using this library.
 *
 * @param props QSNextGenProps
 * @returns
 */
export function QueryProvider(props: React.PropsWithChildren<QSNextGenProps>) {
  const {
    children,
    queryClient: overrideQueryClient,
    apiCoreProvider,
    defaultRefetchIntervalMillis,
    clientId,
    apiUrl,
    authMethod,
    authToken,
    culture,
    geolocation,
    clientOptions,
  } = props;

  const queryClient = useMemo(
    () =>
      overrideQueryClient ?? internalQueryClient(defaultRefetchIntervalMillis),
    [defaultRefetchIntervalMillis, overrideQueryClient]
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApiProvider
          core={apiCoreProvider}
          clientId={clientId}
          authMethod={authMethod}
          authToken={authToken}
          baseApiUrl={apiUrl}
          culture={culture}
          geolocation={geolocation}
          clientOptions={clientOptions}
        >
          {children}
        </ApiProvider>
      </QueryClientProvider>
    </>
  );
}
