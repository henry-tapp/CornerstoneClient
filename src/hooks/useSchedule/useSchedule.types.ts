
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData } from "types";
import { ScheduleWeekView } from "types/Plan";

export type ScheduleError =
  | undefined
  | {
    /**
     * If there is an error (accessing the API etc) this message should be displayed.
     */
    message?: string;
  };


/**
   *  Schedule Week
   */
export interface UseScheduleWeekProps extends DisableHook, DisableSuspenseHook {
  planId: string;
  weekNumber: number;
}

export interface UseScheduleWeekData extends DisableSuspenseHookData {
  error?: ScheduleError;
  data?: ScheduleWeekView;
}
