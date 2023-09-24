import { QueryClient } from "@tanstack/react-query";

import {
  ApiAuthMethod,
  ApiClientOptions,
  ApiGeolocation,
  ApiProviderCore,
} from "../../api";

export interface QueryProviderProps {
  /**
   * Required: What API should this app be using.
   */
  apiUrl: string;

  /**
   * Required: The client ID that is passed to the API so it knows what client / app  is
   * making requests and therefore how it should provide the response data.
   */
  clientId: string;

  /**
   * Required: The raw query string the client is currently using so the API can include it
   * in response APIs if required to maintain context.
   */
  clientOptions: ApiClientOptions;

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

  /**
   * Optional: If the user is logged in then this should always be set to their JWT token.
   */
  authToken?: string;

  /**
   * Optional: What culture should the API return strings in.
   * This should usually be set to whatever the device default is.
   */
  culture?: string;

  /**
   * Optional: The current location of the user.
   */
  geolocation?: ApiGeolocation;

}
