import Axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse } from "axios";

import {
  ApiHeaders,
  ApiResponse,
  RequestProcessor,
  RequestProcessorOptions,
} from "./RequestProcessor";

export class AxiosRequestProcessor implements RequestProcessor {
  public constructor(baseUrl?: string, baseHeaders?: ApiHeaders) {
    this._baseUrl = baseUrl;
    this._baseHeaders = baseHeaders;

    this._axiosInstance = Axios.create({
      baseURL: baseUrl,
      headers: baseHeaders as AxiosRequestHeaders,
    });

    // TODO: Confirm if we actually want this functionality! I.E. always using Local
    //       Storage access token for requests, irrespective of what was passed into props!
    this._axiosInstance.interceptors.request.use((config) => {
      // TODO: Warning! This isn't cross platform safe!
      const token = localStorage.getItem("token");
      if (token && config?.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  private _baseUrl?: string;
  private _baseHeaders?: ApiHeaders;

  private _axiosInstance?: AxiosInstance;

  public get baseUrl(): string | undefined {
    return this._baseUrl;
  }

  public get baseHeaders(): ApiHeaders | undefined {
    return this._baseHeaders;
  }

  private makeResponse<T>(
    response: AxiosResponse<T, any> | undefined | null
  ): ApiResponse<T> {
    return {
      status: response?.status,
      statusText: response?.statusText,
      data: response?.data,
      headers: response?.headers as ApiHeaders, // This casting isn't great
    } as ApiResponse<T>;
  }

  public async get<ResponseDataType>(
    url?: string | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const response = await this._axiosInstance?.get<ResponseDataType>(
      url ?? "",
      {
        headers: options?.headers as AxiosRequestHeaders,
        responseType: options?.responseType,
        validateStatus: options?.validateStatus ?? ((status) => true),
      }
    );

    // TODO: Proper error handling - ApiResponseError

    return this.makeResponse<ResponseDataType>(response);
  }

  public async post<PayloadData, ResponseDataType>(
    url?: string | undefined,
    payload?: PayloadData | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const response = await this._axiosInstance?.post<ResponseDataType>(
      url ?? "",
      payload,
      {
        headers: options?.headers as AxiosRequestHeaders,
        responseType: options?.responseType,
        validateStatus: options?.validateStatus ?? ((status) => true),
      }
    );

    // TODO: Proper error handling - ApiResponseError

    return this.makeResponse<ResponseDataType>(response);
  }

  public async put<PayloadData, ResponseDataType>(
    url?: string | undefined,
    payload?: PayloadData | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const response = await this._axiosInstance?.put<ResponseDataType>(
      url ?? "",
      payload,
      {
        headers: options?.headers as AxiosRequestHeaders,
        responseType: options?.responseType,
        validateStatus: options?.validateStatus ?? ((status) => true),
      }
    );

    // TODO: Proper error handling - ApiResponseError

    return this.makeResponse<ResponseDataType>(response);
  }

  public async patch<PayloadData, ResponseDataType>(
    url?: string | undefined,
    payload?: PayloadData | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const response = await this._axiosInstance?.patch<ResponseDataType>(
      url ?? "",
      payload,
      {
        headers: options?.headers as AxiosRequestHeaders,
        responseType: options?.responseType,
        validateStatus: options?.validateStatus ?? ((status) => true),
      }
    );

    // TODO: Proper error handling - ApiResponseError

    return this.makeResponse<ResponseDataType>(response);
  }

  public async delete<ResponseDataType>(
    url?: string | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const response = await this._axiosInstance?.delete<ResponseDataType>(
      url ?? "",
      {
        headers: options?.headers as AxiosRequestHeaders,
        responseType: options?.responseType,
        validateStatus: options?.validateStatus ?? ((status) => true),
      }
    );

    // TODO: Proper error handling - ApiResponseError

    return this.makeResponse<ResponseDataType>(response);
  }
}
