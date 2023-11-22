
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { ApiResponse } from "api";
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
  weekId?: string;
}

export interface UseWeekItemsData extends DisableSuspenseHookData {
  error?: ScheduleError;
  data?: WeekItem[];
}

export interface UseWeekItemUpdateProps {

  weekItem: WeekItem;
}
export interface UseWeekItemsUpdateData {

  updateWeekItemAsync: UseMutateAsyncFunction<ApiResponse<{}>, unknown, void, unknown>;
}