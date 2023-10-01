export type ApiProviderCore = "axios" | "fetch";

export type ApiAuthMethod = "Bearer" | string;

/**
 * The properties to create an instance of the ApiProvider.
 */
export interface ApiProviderProps {
  core?: ApiProviderCore;
  baseApiUrl?: string;
  authToken?: string;
  authMethod?: ApiAuthMethod;
  clientId: string;
  culture?: string;
}

export interface ApiResponseData {
  time?: string;
  expires_at?: string;
  expires_in?: number;
}

export interface ApiListResponse extends ApiResponseData {
  count?: number | null;
}

export interface Annotation {
  icon?: string;
  title?: string;
  description?: string;
}

/**
 * A type-guard to determine if a payload is a valid ApiBaseResponse.
 */
export function isApiBaseResponse<TData>(payload: any): payload is ApiResponseData<TData> {
  return (
    payload !== null && typeof payload === "object" && "expires_in" in payload
  );
}
