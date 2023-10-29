import { UserMeasurements, UserPreferences } from "types/User";
import {
    ApiResponse,
    GenericRequestOptions,
    RequestProcessor,
} from "../../api";
import {
    MultipleWorkoutGroup,
    PhaseType,
    Plan,
    PlanOptions, Schedule, ScheduleWeekView
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
     * Get the plan for the users auth token.
     *
     * @returns The plan if successful.
     */
    getPlan: () => Promise<ApiResponse<Plan>>;

    /**
     * Creates a new plan
     *
     * @returns 
     */
    createPlan: (plan: PlanOptions) => Promise<ApiResponse<{}>>;

    /**
         * Get the full schedule  for the users auth token.
         *
         * @returns The the full schedule if successful.
         */
    getSchedule: () => Promise<ApiResponse<Schedule>>;

    /**
     * Get the schedule items for a given week.
     *
     * @returns The Schedule week item data if successful.
     */
    getScheduleWeek: (planId: string, weekNumber: number) => Promise<ApiResponse<ScheduleWeekView>>

    /**
     * Get Item Types
     *
     * @returns The Item types if successful.
     */
    getWorkoutGroupsForPhase: (phase: PhaseType) => Promise<ApiResponse<MultipleWorkoutGroup[]>>;

    /**
   * Gets users measurements
   *
   * @returns User Measurements if successful
   */
    getUserMeasurements: () => Promise<ApiResponse<UserMeasurements>>;

    /**
     * Adds users measurements
     *
     * @returns 
     */
    addUserMeasurements: (data: UserMeasurements) => Promise<ApiResponse<{}>>;

    /**
     * Updates users measurements
     *
     * @returns 
     */
    updateUserMeasurements: (data: UserMeasurements) => Promise<ApiResponse<{}>>;

    /**
     * Adds users preferences
     *
     * @returns 
     */
    addUserPreferences: (data: UserPreferences) => Promise<ApiResponse<{}>>;
}
