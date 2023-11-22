import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { getUseQueryOptions } from "util/queryOptions";
import { Queries } from "../../api";
import { UseScheduleWeeksData, UseScheduleWeeksProps } from "./useScheduleWeeks.types";

/**
 * A hook to retrieve {@link UseScheduleWeeksData} data.
 */
export function useScheduleWeeks({ planId, disableSuspense, disabled }: UseScheduleWeeksProps): UseScheduleWeeksData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getScheduleWeeks(),
    async () => {
      if (!planId) {
        throw new Error("No plan found");
      }
      const response = await api.getScheduleWeeks(planId);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    getUseQueryOptions(Queries.getScheduleWeeks(), disabled, disableSuspense)
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
