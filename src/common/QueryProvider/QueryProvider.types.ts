import { ApiAuthMethod } from "api/Api.types";

export interface QueryProviderProps {
  /**
   * Required: What API should this app be using.
   */
  apiUrl: string;

  /**
   * By default we try to refetch API data based on if the API includes expiry metadata in the
   * response, however if this isn't present then refetching can fallback to this interval
   * if specified.
   * If not specified then will default to 60000 (60 seconds).
   * Explicitly set this to null to force NO fallback refetching unless the API response explicitly
   * includes it.
   */
  defaultRefetchIntervalMillis?: number | null;

  /**
   * Optional: Specify what auth method to use for the API Authorization header.
   * Default = Bearer
   */
  authMethod?: ApiAuthMethod;

}
