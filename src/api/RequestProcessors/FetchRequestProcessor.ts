import loglevel from "loglevel";

import {
  ApiHeaders,
  ApiResponse,
  RequestProcessor,
  RequestProcessorOptions,
} from "./RequestProcessor";
import {
  getLocalStorageAuthToken,
  isUrlAbsolute,
} from "./RequestProcessorUtils";

export class FetchRequestProcessor implements RequestProcessor {
  public constructor(baseUrl?: string, baseHeaders?: ApiHeaders) {
    // this._baseUrl = baseUrl;
    this._baseHeaders = baseHeaders;

    this._baseUrl = new URL(baseUrl ?? "");

    loglevel.warn(
      "Fetch RequestProcessor is not yet fully implemented / tested!"
    );
  }

  // private _baseUrl?: string;
  private _baseUrl?: URL;
  private _baseHeaders?: ApiHeaders;

  public get baseUrl(): string | undefined {
    return this._baseUrl?.href;
  }

  public get baseHeaders(): ApiHeaders | undefined {
    return this._baseHeaders;
  }

  private async makeResponse<T>(
    response: Response | undefined | null
  ): Promise<ApiResponse<T>> {
    const responseHeaders: Record<string, string> = {};
    response?.headers?.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    let payload = undefined;
    try {
      payload = await response?.json();
    } catch (err) {
      // console.error(err);
    }

    return {
      status: response?.status,
      statusText: response?.statusText,
      data: payload as T,
      headers: responseHeaders,
    } as ApiResponse<T>;
  }

  private mapHeaders(
    headers?: ApiHeaders | undefined,
    addAuthorizationHeader: boolean = true
  ): HeadersInit | undefined {
    const inputHeaders = headers ?? {};
    const mappedHeaders = Object.entries(inputHeaders ?? {}).map(
      ([key, value]) => [key, Array.isArray(value) ? value.join(", ") : value]
    ) as [string, string][];

    const lowercaseHeaderKeys = Object.keys(inputHeaders).map((k) =>
      k.toLowerCase()
    );

    // Similar to the Axios provider:
    // TODO: Confirm if we actually want this functionality! I.E. always using Local
    //       Storage access token for requests, irrespective of what was passed into props!
    if (!("authorization" in lowercaseHeaderKeys)) {
      const token = getLocalStorageAuthToken();
      if (token) {
        mappedHeaders.push(["Authorization", token]);
      }
    }

    return mappedHeaders;
  }

  // This is a bit sketchy
  private makeTargetUrl(url: string): string {
    if (isUrlAbsolute(url)) {
      return url;
    }
    return this._baseUrl?.href + url;
  }

  public async get<ResponseDataType>(
    url?: string | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const targetUrl = this.makeTargetUrl(url ?? "");
    try {
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: this.mapHeaders(options?.headers),
      });

      // Other libraries like Axios have a validateStatus option internally
      // but fetch doesn't so we have to do it manually
      if (options?.validateStatus) {
        if (!options.validateStatus(response.status)) {
          throw new Error(`Invalid status code: ${response.status}`);
        }
      }

      return await this.makeResponse<ResponseDataType>(response);
    } catch (e) {
      console.error(e);
      return {
        status: 500
      };
    }
  }

  public async put<PayloadData, ResponseDataType>(
    url?: string | undefined,
    payload?: PayloadData | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const targetUrl = this.makeTargetUrl(url ?? "");
    const response = await fetch(targetUrl, {
      method: "PUT",
      headers: this.mapHeaders(options?.headers),
      body: JSON.stringify(payload),
    });

    // TODO: Proper error handling - ApiResponseError

    // Other libraries like Axios have a validateStatus option internally
    // but fetch doesn't so we have to do it manually
    if (options?.validateStatus) {
      if (!options.validateStatus(response.status)) {
        throw new Error(`Invalid status code: ${response.status}`);
      }
    }

    return await this.makeResponse<ResponseDataType>(response);
  }

  public async post<PayloadData, ResponseDataType>(
    url?: string | undefined,
    payload?: PayloadData | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const targetUrl = this.makeTargetUrl(url ?? "");
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: this.mapHeaders(options?.headers),
      body: JSON.stringify(payload),
    });

    // TODO: Proper error handling - ApiResponseError

    // Other libraries like Axios have a validateStatus option internally
    // but fetch doesn't so we have to do it manually
    if (options?.validateStatus) {
      if (!options.validateStatus(response.status)) {
        throw new Error(`Invalid status code: ${response.status}`);
      }
    }

    return await this.makeResponse<ResponseDataType>(response);
  }

  public async patch<PayloadData, ResponseDataType>(
    url?: string | undefined,
    payload?: PayloadData | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const targetUrl = this.makeTargetUrl(url ?? "");
    const response = await fetch(targetUrl, {
      method: "PATCH",
      headers: this.mapHeaders(options?.headers),
      body: JSON.stringify(payload),
    });

    // TODO: Proper error handling - ApiResponseError

    // Other libraries like Axios have a validateStatus option internally
    // but fetch doesn't so we have to do it manually
    if (options?.validateStatus) {
      if (!options.validateStatus(response.status)) {
        throw new Error(`Invalid status code: ${response.status}`);
      }
    }

    return await this.makeResponse<ResponseDataType>(response);
  }

  public async delete<ResponseDataType>(
    url?: string | undefined,
    options?: RequestProcessorOptions | undefined
  ): Promise<ApiResponse<ResponseDataType>> {
    const targetUrl = this.makeTargetUrl(url ?? "");
    const response = await fetch(targetUrl, {
      method: "DELETE",
      headers: this.mapHeaders(options?.headers),
    });

    // TODO: Proper error handling - ApiResponseError

    // Other libraries like Axios have a validateStatus option internally
    // but fetch doesn't so we have to do it manually
    if (options?.validateStatus) {
      if (!options.validateStatus(response.status)) {
        throw new Error(`Invalid status code: ${response.status}`);
      }
    }

    return await this.makeResponse<ResponseDataType>(response);
  }
}
