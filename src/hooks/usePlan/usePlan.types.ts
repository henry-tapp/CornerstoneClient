
import { ApiResponseData } from "api/Api.types";
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData, ScheduleWeekView } from "types";
import { Plan } from "types/Plan";

export type PlanError =
  | undefined
  | {
    /**
     * If there is an error (accessing the API etc) this message should be displayed.
     */
    message?: string;
  };

/**
 *  Plan
 */
export interface UsePlanProps extends DisableHook, DisableSuspenseHook {
}

export interface UsePlanData extends ApiResponseData, DisableSuspenseHookData {
  error?: PlanError;
  data?: Plan;
}

/**
   *  Schedule Week
   */
export interface UseScheduleWeekProps extends DisableHook, DisableSuspenseHook {
  planId: number;
  weekNumber: number;
}

export interface UseScheduleWeekData extends DisableSuspenseHookData {
  error?: PlanError;
  data?: ScheduleWeekView;
}
