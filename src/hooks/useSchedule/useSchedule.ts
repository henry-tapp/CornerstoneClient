import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { logQuerySettled } from "util/log";
import { Queries } from "../../api";
import { UseScheduleWeekData, UseScheduleWeekProps } from "./useSchedule.types";

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
    {
      staleTime: 5 * 1000 * 60,
      enabled: !disabled && !!weekNumber,
      suspense: disableSuspense ? false : true,
      refetchOnMount: true,

      onSettled: (d, err) =>
        logQuerySettled(Queries.getPlanWeek(weekNumber), d, err),
    }
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
