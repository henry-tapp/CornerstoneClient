import { ApiHeaders, ApiResponse, RequestProcessor, RequestProcessorOptions } from "./RequestProcessor";


export abstract class RequestProcessorBase implements RequestProcessor {

    public constructor(handleRefresh: () => Promise<string>, baseUrl?: string, baseHeaders?: ApiHeaders) {
        this._baseUrl = baseUrl;
        this._baseHeaders = baseHeaders;
        this._handleRefresh = handleRefresh;
    }

    abstract get<ResponseDataType>(url?: string | undefined, options?: RequestProcessorOptions | undefined): Promise<ApiResponse<ResponseDataType>>;
    abstract post<PayloadData, ResponseDataType>(url?: string | undefined, payload?: PayloadData | undefined, options?: RequestProcessorOptions | undefined): Promise<ApiResponse<ResponseDataType>>;
    abstract put<PayloadData, ResponseDataType>(url?: string | undefined, payload?: PayloadData | undefined, options?: RequestProcessorOptions | undefined): Promise<ApiResponse<ResponseDataType>>;
    abstract patch<PayloadData, ResponseDataType>(url?: string | undefined, payload?: PayloadData | undefined, options?: RequestProcessorOptions | undefined): Promise<ApiResponse<ResponseDataType>>;
    abstract delete<ResponseDataType>(url?: string | undefined, options?: RequestProcessorOptions | undefined): Promise<ApiResponse<ResponseDataType>>;

    protected _baseUrl?: string;
    protected _baseHeaders?: ApiHeaders;
    private _handleRefresh: () => Promise<string>;

    public get baseUrl(): string | undefined {
        return this._baseUrl;
    }

    public get baseHeaders(): ApiHeaders | undefined {
        return this._baseHeaders;
    }

    protected async handleRefresh() {

        var token = await this._handleRefresh();
        this._baseHeaders!["Authorization"] = `bearer: ${token}`;
    }
}