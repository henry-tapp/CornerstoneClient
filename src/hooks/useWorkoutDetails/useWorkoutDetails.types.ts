
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData, ScheduledActivity, ScheduledRoutine } from "types";

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
export interface UseWorkoutDetailsProps extends DisableHook, DisableSuspenseHook {
  weekItemId?: string;
  weekItemWorkoutId?: string;
}

export interface UseWorkoutDetailsData extends DisableSuspenseHookData {
  error?: ScheduleError;
  data?: ScheduledActivity | ScheduledRoutine;
}
