
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData, WeekItem } from "types";

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
export interface UseWeekItemsProps extends DisableHook, DisableSuspenseHook {
  weekItemId?: string;
}

export interface UseWeekItemsData extends DisableSuspenseHookData {
  error?: ScheduleError;
  data?: WeekItem[];
}
