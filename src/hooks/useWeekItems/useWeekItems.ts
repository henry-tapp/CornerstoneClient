import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { Queries } from "../../api";
import { UseWeekItemUpdateProps, UseWeekItemsData, UseWeekItemsProps, UseWeekItemsUpdateData } from "./useWeekItems.types";

import { getUseQueryOptions } from "util/queryOptions";
import { WeekItem } from "types";

/**
 * A hook to retrieve {@link weekitems } data.
 */
export function useWeekItems({ weekId, disableSuspense, disabled }: UseWeekItemsProps): UseWeekItemsData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getWeekItems(weekId),
    async () => {
      if (!weekId) {
        throw new Error("No Week ID");
      }
      const response = await api.getWeekItems(weekId)
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    getUseQueryOptions(Queries.getWeekItems(weekId), disabled && !!weekId, disableSuspense)
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
 