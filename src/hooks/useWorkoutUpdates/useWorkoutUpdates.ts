import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Queries } from "api";
import { useApi } from "hooks/useApi/useApi";
import { useCallback } from "react";
import { UseWorkoutUpdatesData, WorkoutCompleteProps } from "./useWorkoutUpdates.types";

export function useWorkoutUpdates(): UseWorkoutUpdatesData {

    const api = useApi();

    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation(async ({ workoutUpdate, workoutLog }: WorkoutCompleteProps) => {

        await api.updateWorkout(workoutUpdate);

        await api.addWorkoutLog(workoutLog);
    });

    return {
        updateWorkout: useCallback(async (props: WorkoutCompleteProps) => {

            await mutateAsync(props);
            Promise.all([
                queryClient.invalidateQueries(Queries.getWeekItems()),
                queryClient.invalidateQueries(Queries.getWeekItemWorkouts())
            ]);

        }, [mutateAsync, queryClient])
    };
}