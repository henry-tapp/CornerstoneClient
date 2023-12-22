import { UserMeasurements, UserPreferences } from "types/User";
import { WorkoutLog } from "types/WorkoutLog";
import {
    ApiResponse,
    GenericRequestOptions,
    RequestProcessor,
} from "../../api";
import {
    Plan,
    PlanOptions,
    ScheduleWeekView, ScheduledWorkout, UpdateWorkoutProps, WeekItem
} from "../../types";

export interface Api {
    /**
     * The request processor being used to access the API.
     */
    requestProcessor: RequestProcessor;

    get: <T = unknown>(
        path: string,
        options?: GenericRequestOptions
    ) => Promise<ApiResponse<T>>;

    post: <T = unknown, D = unknown>(
        path: string,
        payload?: D,
        options?: GenericRequestOptions
    ) => Promise<ApiResponse<T>>;

    /* Schedule */

    getPlan: () => Promise<ApiResponse<Plan>>;

    createPlan: (plan: PlanOptions) => Promise<ApiResponse<{}>>;

    getScheduleWeeks: (planId: string) => Promise<ApiResponse<ScheduleWeekView[]>>;

    /* WeekItems */

    getWeekItems: (weekId: string) => Promise<ApiResponse<WeekItem[]>>;

    updateWeekItem(weekitems: WeekItem[]): Promise<ApiResponse<{}>>;

    /* Workouts */

    getWorkout: (weekItemId: string, weekItemWorkoutId: string) => Promise<ApiResponse<ScheduledWorkout>>;

    getWorkouts: (weekItemId: string) => Promise<ApiResponse<ScheduledWorkout[]>>;

    /* User */

    getUserMeasurements: () => Promise<ApiResponse<UserMeasurements>>;

    addUserMeasurements: (data: UserMeasurements) => Promise<ApiResponse<{}>>;

    updateUserMeasurements: (data: UserMeasurements) => Promise<ApiResponse<{}>>;

    addUserPreferences: (data: UserPreferences) => Promise<ApiResponse<{}>>;


    updateWorkout({ weekItemId, weekItemWorkoutId, completed }: UpdateWorkoutProps): Promise<ApiResponse<{}>>;

    addWorkoutLog(workoutLog: WorkoutLog): Promise<ApiResponse<{}>>;
}
