import { useApiProvider } from "api";
import { Plan, PlanOptions, ScheduleWeekView, ScheduledWorkout, UpdateWorkoutProps, WeekItem } from "types";
import { UserMeasurements, UserPreferences } from "types/User";
import { WorkoutLog } from "types/WorkoutLog";
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

        getScheduleWeeks: (planId: string) => apiProvider.get<ScheduleWeekView[]>(`${prefix}/schedule/${planId}`),

        getWeekItems: (weekId: string) => apiProvider.get<WeekItem[]>(`${prefix}/schedule/week/${weekId}/items`),

        updateWeekItem: (weekItems: WeekItem[]) => apiProvider.patch(`${prefix}/schedule/week/item`, weekItems.map(weekItem => ({ id: weekItem.id, completed: weekItem.completed, scheduledDayOfWeek: weekItem.scheduledDayOfWeek }))),

        getWorkout: (weekItemId: string, weekItemWorkoutId: string) => apiProvider.get<ScheduledWorkout>(`${prefix}/scheduleitem/${weekItemId}/workout/${weekItemWorkoutId}`),

        getWorkouts: (weekItemId: string) => apiProvider.get<ScheduledWorkout[]>(`${prefix}/scheduleitem/${weekItemId}`),

        updateWorkout: ({ weekItemId, weekItemWorkoutId, complete }: UpdateWorkoutProps) => apiProvider.patch(`${prefix}/scheduleitem/${weekItemId}/workout/${weekItemWorkoutId}`, { complete: complete }),

        addWorkoutLog: (workoutLog: WorkoutLog) => apiProvider.post(`${prefix}/workout/log`, workoutLog),

        getUserMeasurements: () => apiProvider.get<UserMeasurements>(`${prefix}/user/profile/measurements`),

        addUserMeasurements: (data: UserMeasurements) => apiProvider.post<UserMeasurements, {}>(`${prefix}/user/profile/measurements`, data),

        updateUserMeasurements: (data: UserMeasurements) => apiProvider.put<UserMeasurements, {}>(`${prefix}/user/profile/measurements`, data),

        addUserPreferences: (data: UserPreferences) => apiProvider.post<UserPreferences, {}>(`${prefix}/user/profile/preferences`, data)
    };
}
