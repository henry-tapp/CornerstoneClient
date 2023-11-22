import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { Queries } from "../../api";
import { UseWeekItemsData, UseWeekItemsProps } from "./useWeekItemsWorkouts.types";

import { getUseQueryOptions } from "util/queryOptions";

/**
 * A hook to retrieve {@link weekitems } data.
 */
export function useWeekItemWorkouts({ weekItemId, disableSuspense, disabled }: UseWeekItemsProps): UseWeekItemsData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getWeekItemWorkouts(weekItemId),
    async () => {
      if (!weekItemId) {
        throw new Error("No Week Item ID");
      }
      const response = await api.getWeekItemWorkouts(weekItemId)
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    getUseQueryOptions(Queries.getWeekItems(weekItemId), disabled, disableSuspense)
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
