
import { ApiResponseData } from "api/Api.types";
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData } from "types";
import { Schedule } from "types/Schedule";

export type ScheduleError =
  | undefined
  | {
    /**
     * If there is an error (accessing the API etc) this message should be displayed.
     */
    message?: string;
  };

export interface UseScheduleProps extends DisableHook, DisableSuspenseHook {
  ScheduleId?: string;
}

export interface UseScheduleData extends DisableSuspenseHookData {
  error?: ScheduleError;

  data?: ApiResponseData<Schedule>;
}
