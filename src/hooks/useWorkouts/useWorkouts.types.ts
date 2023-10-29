
import { ApiResponseData } from "api/Api.types";
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData, MultipleWorkoutGroup, PhaseType } from "types";

export type ItemError =
  | undefined
  | {
    /**
     * If there is an error (accessing the API etc) this message should be displayed.
     */
    message?: string;
  };

/**
 *  Multiple workout group
 */


export interface UseMultipleWorkoutGroupProps extends DisableHook, DisableSuspenseHook {

}

export interface UseMultipleWorkoutGroupForPhaseProps extends UseMultipleWorkoutGroupProps {
  phase: PhaseType;
}

export interface UseMultipleWorkoutGroupData extends ApiResponseData, DisableSuspenseHookData {
  error?: ItemError;
  data?: MultipleWorkoutGroup[];
}
