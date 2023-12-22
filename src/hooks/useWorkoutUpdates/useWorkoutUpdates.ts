import { useMutation } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { UpdateWorkoutProps } from "types";
import { WorkoutLog } from "types/WorkoutLog";
import { UseWorkoutUpdatesData } from "./useWorkoutUpdates.types";

export function useWorkoutUpdates(): UseWorkoutUpdatesData {

    const api = useApi();

    const { mutateAsync: updateWorkoutMutationAsync } = useMutation(async (workoutUpdate: UpdateWorkoutProps) => await api.updateWorkout(workoutUpdate));

    const { mutateAsync: logWorkoutMutationAsync } = useMutation(async (logWorkout: WorkoutLog) => await api.addWorkoutLog(logWorkout));

    return {
        updateWorkout: (props) => updateWorkoutMutationAsync(props),
        logWorkout: logWorkoutMutationAsync
    };
}