import { useApiProvider } from "api";
import { ItemType, Plan, PlanWeek } from "types";
import { UserMeasurements } from "types/UserMeasurements";
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
        getPlan: () => apiProvider.get<Plan>(`${prefix}/plan`),

        createPlan: (data: Plan) => apiProvider.post<Plan, {}>(`${prefix}/plan`, data),

        getPlanWeek: (weekNumber: number) => apiProvider.get<PlanWeek>(`${prefix}/plan/week/${weekNumber}`),

        getItemTypes: () => apiProvider.get<ItemType[]>(`${prefix}/itemtype`),

        getUserMeasurements: () => apiProvider.get<UserMeasurements>(`${prefix}/users/measurements`),
        addUserMeasurements: (data: UserMeasurements) => apiProvider.post<UserMeasurements, {}>(`${prefix}/users/measurements`, data),
        updateUserMeasurements: (data: UserMeasurements) => apiProvider.put<UserMeasurements, {}>(`${prefix}/users/measurements`, data)
    };
}
