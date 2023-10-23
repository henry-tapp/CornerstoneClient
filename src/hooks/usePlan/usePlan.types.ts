
import { ApiResponseData } from "api/Api.types";
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData } from "types";
import { Plan, PlanWeek } from "types/Plan";

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
   *  Plan Week
   */
export interface UsePlanWeekProps extends DisableHook, DisableSuspenseHook {
  WeekNumber: number;
}

export interface UsePlanWeekData extends DisableSuspenseHookData {
  error?: PlanError;
  data?: PlanWeek;
}
