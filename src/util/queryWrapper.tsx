import React from "react";

import { QueryClient } from "@tanstack/react-query";

import { ApiProviderCore } from "../api";
import { QueryProvider } from "../common/QueryProvider";

export const testRootApiUrl = (path?: string) =>
  `http://localhost/v2${path ?? ""}`;

export const createWrapper = (
  apiCoreProvider?: ApiProviderCore | undefined
) => {
  // Explicitly disable retries during testing to avoid unpredictable tests
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => { },
    },
  });

  return ({ children }: React.PropsWithChildren) => (
    <QueryProvider
      apiCoreProvider={apiCoreProvider}
      apiUrl={testRootApiUrl()}
      clientId="test-suite"
      clientOptions=""
      queryClient={queryClient}
    >
      {children}
    </QueryProvider>
  );
};
