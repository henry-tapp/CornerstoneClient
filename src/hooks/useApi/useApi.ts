import { useApiProvider } from "api";
import { ApiResponseData } from "api/Api.types";
import { Schedule, ScheduleWeek } from "types";
import { Api } from "./useApi.types";

export function useApi(): Api {
    const apiProvider = useApiProvider();

    const prefix = "";

    return {
        requestProcessor: apiProvider,

        // Expose some base/generic methods
        get: (path: string) => apiProvider.get(`${prefix}${path}`),

        post: (path: string, data?: unknown) =>
            apiProvider.post(`${prefix}${path}`, data),

        // Api Specific methods
        getSchedule: () => apiProvider.get<ApiResponseData<Schedule>>(`${prefix}/schedule`),

        getScheduleWeek: (weekNumber: number) => apiProvider.get<ApiResponseData<ScheduleWeek>>(`${prefix}/schedule/week/${weekNumber}`)
    };
}
