import { useApiProvider } from "api";
import { MultipleWorkoutGroup, PhaseType, Plan, PlanOptions, Schedule, ScheduleWeekView } from "types";
import { UserMeasurements, UserPreferences } from "types/User";
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

        createPlan: (data: PlanOptions) => apiProvider.post<PlanOptions, {}>(`${prefix}/plan`, data),

        getSchedule: () => apiProvider.get<Schedule>(`${prefix}/schedule`),

        getScheduleWeek: (planId: string, weekNumber: number) => apiProvider.get<ScheduleWeekView>(`${prefix}/schedule/${planId}/${weekNumber}`),

        getWorkoutGroupsForPhase: (phase: PhaseType) => apiProvider.get<MultipleWorkoutGroup[]>(`${prefix}/workout/groups/phase/${phase}`),

        getUserMeasurements: () => apiProvider.get<UserMeasurements>(`${prefix}/user/profile/measurements`),

        addUserMeasurements: (data: UserMeasurements) => apiProvider.post<UserMeasurements, {}>(`${prefix}/user/profile/measurements`, data),

        updateUserMeasurements: (data: UserMeasurements) => apiProvider.put<UserMeasurements, {}>(`${prefix}/user/profile/measurements`, data),

        addUserPreferences: (data: UserPreferences) => apiProvider.post<UserPreferences, {}>(`${prefix}/user/profile/preferences`, data)
    };
}
