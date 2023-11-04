import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { getUseQueryOptions } from "util/queryOptions";
import { Queries } from "../../api";
import { UseMultipleWorkoutGroupData, UseMultipleWorkoutGroupForPhaseProps } from "./useWorkouts.types";

/**
 * A hook to retrieve {@link ItemTypes} data.
 */

export function useMultipleWorkoutGroupsForPhase({ phase, disableSuspense, disabled }: UseMultipleWorkoutGroupForPhaseProps): UseMultipleWorkoutGroupData {

    const api = useApi();

    const { data, isLoading, error } = useQuery(
        Queries.getMultipleWorkoutGroupsForPhase(),
        async () => {
            const response = await api.getWorkoutGroupsForPhase(phase);
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.data;
        },
        getUseQueryOptions(Queries.getMultipleWorkoutGroupsForPhase(), disabled, disableSuspense)
    );

    return {
        data,
        error: error ? (error as any)?.message : undefined,
        isLoading,
    };
}
