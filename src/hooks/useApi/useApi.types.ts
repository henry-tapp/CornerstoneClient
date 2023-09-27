import { ApiResponseData } from "api/Api.types";
import {
    ApiResponse,
    GenericRequestOptions,
    RequestProcessor,
} from "../../api";
import {
    Schedule,
} from "../../types";

export interface Api {
    /**
     * The request processor being used to access the API.
     */
    requestProcessor: RequestProcessor;

    /**
     * A generic GET method to allow GET calls on the API.
     *
     * @param path the path to GET (appended to the baseApiUrl of the RequestProvider)
     * @param options
     * @returns A Promise that resolves to an ApiResponse containing the response data of type T
     */
    get: <T = unknown>(
        path: string,
        options?: GenericRequestOptions
    ) => Promise<ApiResponse<T>>;
    /**
     * A generic POST method to allow POST calls on the API.
     *
     * @param path the path to POST (appended to the baseApiUrl of the RequestProvider)
     * @param payload Any data of type D that should be included as the payload
     * @param options
     * @returns A Promise that resolves to an ApiResponse containing the response data of type T
     */
    post: <T = unknown, D = unknown>(
        path: string,
        payload?: D,
        options?: GenericRequestOptions
    ) => Promise<ApiResponse<T>>;

    /**
     * Get the schedule for the users auth token.
     *
     * @returns The Schedule data if successful.
     */
    getSchedule: () => Promise<ApiResponse<ApiResponseData<Schedule>>>;

}
