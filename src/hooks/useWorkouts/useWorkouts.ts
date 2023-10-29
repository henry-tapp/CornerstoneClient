import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { logQuerySettled } from "util/log";
import { Queries } from "../../api";
import { UseMultipleWorkoutGroupData, UseMultipleWorkoutGroupForPhaseProps } from "./useWorkouts.types";

/**
 * A hook to retrieve {@link ItemTypes} data.
 */
export function useMultipleWorkoutGroupsForPhase({ phase, disableSuspense, disabled }: UseMultipleWorkoutGroupForPhaseProps): UseMultipleWorkoutGroupData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getItemTypes(),
    async () => {
      const response = await api.getWorkoutGroupsForPhase(phase)
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    {
      staleTime: 5 * 1000 * 60,
      refetchOnMount: true,
      enabled: !disabled,
      suspense: disableSuspense ? false : true,
      onSettled: (d, err) =>
        logQuerySettled(Queries.getItemTypes(), d, err),
    }
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
