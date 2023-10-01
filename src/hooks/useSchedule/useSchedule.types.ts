
import { ApiResponseData } from "api/Api.types";
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData } from "types";
import { Schedule, ScheduleWeek } from "types/Schedule";

export type ScheduleError =
  | undefined
  | {
    /**
     * If there is an error (accessing the API etc) this message should be displayed.
     */
    message?: string;
  };

/**
 *  Schedule
 */
export interface UseScheduleProps extends DisableHook, DisableSuspenseHook {

}

export interface UseScheduleData extends ApiResponseData, DisableSuspenseHookData {
  error?: ScheduleError;
  data?: Schedule;
}

/**
   *  Schedule Week
   */
export interface UseScheduleWeekProps extends DisableHook, DisableSuspenseHook {
  WeekNumber: number;
}

export interface UseScheduleWeekData extends DisableSuspenseHookData {
  error?: ScheduleError;
  data?: ScheduleWeek;
}
