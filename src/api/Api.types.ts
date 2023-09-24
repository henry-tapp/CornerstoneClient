import { Action, ISODateTimeString, LinkKey, LinkUrl } from "../types";

/**
 * The underlying HTTP provider to handle the API calls.
 * Currently we only support axios.
 *
 * If we ever support other underlying mechanics e.g. fetch or another library,
 * add it here and implement it in the provider factory.
 */
export type ApiProviderCore = "axios" | "fetch";

export type Links = Record<LinkKey, LinkUrl>;

/**
 * The auth method to use when setting the **Authorization** header in
 * api requests.
 */
export type ApiAuthMethod = "Bearer" | string;

export type ApiGeolocation = string; // TODO: confirm the type of this

/**
 * This represents the raw query string from the client to be sent to the API
 * in all requests as the `Client-Options` header.
 * This is critical in some circumstances where the API generates URLs that
 * **NEED** to include the existing query string parameters.
 *
 * Example:
 * ```
 * ?authToken=123123123123&style=wintertime
 * ```
 */
export type ApiClientOptions = string;

/**
 * The properties to create an instance of the ApiProvider.
 */
export interface ApiProviderProps {
  core?: ApiProviderCore;
  /**
   * The Base URL to use for all api requests.
   */
  baseApiUrl?: string;
  clientOptions: ApiClientOptions;
  /**
   * The auth token that should be used to set the `Authorization` header in all requests.
   */
  authToken?: string;
  authMethod?: ApiAuthMethod; // Default = Bearer
  /**
   * The Client Id that is sent to the API in all requests as the `Client-ID` header.
   */
  clientId: string;
  culture?: string;
  geolocation?: ApiGeolocation; // TODO: Confirm what this is
}

/**
 * A base response containing all the common properties that
 * _should_ be included in all responses from the API.
 */
export interface ApiResponseData<TData, TClientData> {
  /** The time the response was generated. */
  time?: ISODateTimeString;
  /**
   * If the data requires refreshing and the API knows when this is needed, it
   * may include the expires_at or expires_in properties in the response.
   * If one of these are set then the app needs to handle re-fetching the data
   * when the API specified, assuming that some critical data will have changed.
   */
  expires_at?: ISODateTimeString;
  /**
   * If the data requires refreshing and the API knows when this is needed, it
   * may include the expires_at or expires_in properties in the response.
   * If one of these are set then the app needs to handle re-fetching the data
   * when the API specified, assuming that some critical data will have changed.
   */
  expires_in?: number;
  links?: Links;
  data: TData;
  /** Any Actions associated with the response. */
  actions?: Action[];
  annotations?: Annotation;
  /**
   * Given the client ID passed to the API during the request, it will generate
   * data specifically for that client in the response which is included here.
   *
   * An example of this could be for a web application the response may contain HTML
   * specific data.
   */
  client_data: TClientData;
}

export interface ApiListData<TData, TClientData> {
  data: TData;
  client_data: TClientData;
  links: Links;
}

// Plural I.E. /v2/reservations
export interface ApiListResponse<TData, TClientData>
  extends Omit<
    ApiResponseData<TData extends {} ? TData : never, TClientData>,
    "data" | "actions" | "annotations" | "client_data"
  > {
  count?: number | null;
  items?: ApiListData<TData, TClientData>[];
}

export interface Annotation {
  icon?: string;
  title?: string;
  description?: string;
}

/**
 * A type-guard to determine if a payload is a valid ApiBaseResponse.
 */
export function isApiBaseResponse<TData, TClientData>(
  payload: any
): payload is ApiResponseData<TData, TClientData> {
  return (
    payload !== null && typeof payload === "object" && "expires_in" in payload
  );
}
