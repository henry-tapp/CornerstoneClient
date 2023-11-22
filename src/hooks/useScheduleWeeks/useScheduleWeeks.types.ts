
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData, ScheduleWeekView } from "types";

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
export interface UseScheduleWeeksProps extends DisableHook, DisableSuspenseHook {
  planId?: string;
}

export interface UseScheduleWeeksData extends DisableSuspenseHookData {
  error?: ScheduleError;
  data?: ScheduleWeekView[];
}
