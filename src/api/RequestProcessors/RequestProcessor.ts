/**
 * A generic request processor to allow us to swap out the backing HTTP request
 * processor if we desire (e.g. axios, fetch, ...)
 */

export type ApiHeaders = Record<string, string | string[]>;

export interface ApiResponseError {
  status?: number | undefined;
  statusText?: string | undefined;
  headers?: ApiHeaders | undefined;
  message?: string | undefined;
}

export interface ApiResponse<T> {
  status?: number | undefined;
  statusText?: string | undefined;
  data?: T | undefined;
  headers?: ApiHeaders | undefined;
}

export interface RequestProcessorOptions {
  headers?: ApiHeaders;
  responseType?: // Types lifted from Axios for now
  "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";
  validateStatus?: (status: number) => boolean;
}

export interface RequestProcessor {
  /**
   * Returns the base URL for the request processor.
   */
  get baseUrl(): string | undefined;

  /**
   * Returns the base headers for the request processor which
   * are added to every request.
   */
  get baseHeaders(): ApiHeaders | undefined;

  /**
   * @throws {Error} If a generic error occurs, this will be thrown.
   * @throws {ApiResponseErrorNew} If an error occurs with the API, this will be thrown.
   */
  get: <ResponseDataType>(
    url?: string,
    options?: RequestProcessorOptions
  ) => Promise<ApiResponse<ResponseDataType>>;
  /**
   * @throws {Error} If a generic error occurs, this will be thrown.
   * @throws {ApiResponseErrorNew} If an error occurs with the API, this will be thrown.
   */
  post: <PayloadData, ResponseDataType>(
    url?: string,
    payload?: PayloadData,
    options?: RequestProcessorOptions
  ) => Promise<ApiResponse<ResponseDataType>>;
  /**
   * @throws {Error} If a generic error occurs, this will be thrown.
   * @throws {ApiResponseErrorNew} If an error occurs with the API, this will be thrown.
   */
  patch: <PayloadData, ResponseDataType>(
    url?: string,
    payload?: PayloadData,
    options?: RequestProcessorOptions
  ) => Promise<ApiResponse<ResponseDataType>>;
  /**
   * @throws {Error} If a generic error occurs, this will be thrown.
   * @throws {ApiResponseErrorNew} If an error occurs with the API, this will be thrown.
   */
  delete: <ResponseDataType>(
    url?: string,
    options?: RequestProcessorOptions
  ) => Promise<ApiResponse<ResponseDataType>>;
}
