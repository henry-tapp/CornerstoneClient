import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { Queries } from "../../api";
import { UseScheduleWeekData, UseScheduleWeekProps } from "./useSchedule.types";

import { getUseQueryOptions } from "util/queryOptions";

/**
 * A hook to retrieve {@link PlanWeek} data.
 */
export function useScheduleWeek({ planId, weekNumber, disableSuspense, disabled }: UseScheduleWeekProps): UseScheduleWeekData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getPlanWeek(weekNumber),
    async () => {

      const response = await api.getScheduleWeek(planId, weekNumber)
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    getUseQueryOptions(Queries.getPlanWeek(weekNumber), disabled, disableSuspense)
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
