import Axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse } from "axios";

import { RequestProcessorBase } from "./RequesProcessorBase";
import {
  ApiHeaders,
  ApiResponse,
  RequestProcessorOptions
} from "./RequestProcessor";

export class AxiosRequestProcessor extends RequestProcessorBase {
  public constructor(handleRefresh: () => Promise<string>, baseUrl?: string, baseHeaders?: ApiHeaders) {

    super(handleRefresh, baseUrl, baseHeaders);

    this._axiosInstance = Axios.create({
      baseURL: baseUrl,
      headers: baseHeaders as AxiosRequestHeaders,
    });
  }

  private _axiosInstance?: AxiosInstance;

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
    if (response?.status === 401) {

      super.handleRefresh();
    }
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

    if (response?.status === 401) {

      super.handleRefresh();
    }

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
    if (response?.status === 401) {

      super.handleRefresh();
    }
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
    if (response?.status === 401) {

      super.handleRefresh();
    }
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
    if (response?.status === 401) {

      super.handleRefresh();
    }
    return this.makeResponse<ResponseDataType>(response);
  }
}
