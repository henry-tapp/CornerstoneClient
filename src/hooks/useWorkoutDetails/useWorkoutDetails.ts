import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { ScheduledActivity, ScheduledRoutine, ScheduledWorkout } from "types";
import { getUseQueryOptions } from "util/queryOptions";
import { Queries } from "../../api";
import { UseWorkoutDetailsData, UseWorkoutDetailsProps } from "./useWorkoutDetails.types";

/**
 * A hook to retrieve {@link UseWeekItemsData } data.
 */
export function useWorkoutDetails({ weekItemId, weekItemWorkoutId, disableSuspense, disabled }: UseWorkoutDetailsProps): UseWorkoutDetailsData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getWeekItemWorkout(weekItemId, weekItemWorkoutId),
    async () => {
      if (!weekItemId || !weekItemWorkoutId) {
        throw new Error("No Week Item ID or workout id");
      }
      const response = await api.getWeekItemWorkout(weekItemId, weekItemWorkoutId)
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data && CastDownToItemType(response.data);
    },
    getUseQueryOptions(Queries.getWeekItemWorkout(weekItemId, weekItemWorkoutId), disabled, disableSuspense)
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
function CastDownToItemType(data: ScheduledWorkout): ScheduledActivity | ScheduledRoutine {

  if (data.itemType === 1) {

    data as ScheduledActivity;
  }

  return data as ScheduledRoutine;
}

