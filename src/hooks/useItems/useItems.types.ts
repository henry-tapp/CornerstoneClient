
import { ApiResponseData } from "api/Api.types";
import { DisableHook, DisableSuspenseHook, DisableSuspenseHookData, ItemType } from "types";

export type ItemError =
  | undefined
  | {
    /**
     * If there is an error (accessing the API etc) this message should be displayed.
     */
    message?: string;
  };

/**
 *  Item Types
 */
export interface UseItemTypesProps extends DisableHook, DisableSuspenseHook {

}

export interface UseItemTypesData extends ApiResponseData, DisableSuspenseHookData {
  error?: ItemError;
  data?: ItemType[];
}
