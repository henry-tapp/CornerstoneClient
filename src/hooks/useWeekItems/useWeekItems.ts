import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { Queries } from "../../api";
import { UseWeekItemsData, UseWeekItemsProps } from "./useWeekItems.types";

import { useCallback } from "react";
import { WeekItem } from "types";
import { getUseQueryOptions } from "util/queryOptions";

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

export function useWeekItemUpdate() {

  const api = useApi();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(async (weekItems: WeekItem[]) => await api.updateWeekItem(weekItems));

  return {
    updateItems: useCallback(async (items: WeekItem[]) => {

      await mutateAsync(items);

      await queryClient.invalidateQueries(Queries.getWeekItems(items[0].weekId));

    }, [mutateAsync, queryClient])
  };
}