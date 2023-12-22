import { useQueryClient } from "@tanstack/react-query";
import { Queries } from "api";
import { useWorkoutUpdates } from "hooks/useWorkoutUpdates/useWorkoutUpdates";
import { createContext, useCallback, useContext } from "react";
import { ScheduledWorkout } from "types";
import { WorkoutLog, WorkoutLogMeasures } from "types/WorkoutLog";


export interface WorkoutRunnerContextData {
    workout: ScheduledWorkout;
    completeWorkout: (workoutLog: WorkoutLogMeasures) => Promise<void>;
}

export interface WorkoutRunnerProviderProps {
    weekItemId: string;
    weekItemWorkoutId: string;
    workout: ScheduledWorkout;
}

export const WorkoutRunnerContext = createContext<WorkoutRunnerContextData>(undefined as any);

export const WorkoutRunnerContextConsumer = WorkoutRunnerContext.Consumer;

export function WorkoutRunnerProvider({ workout, weekItemId, weekItemWorkoutId, children }: React.PropsWithChildren<WorkoutRunnerProviderProps>) {

    const { updateWorkout, logWorkout } = useWorkoutUpdates();

    const queryClient = useQueryClient();

    const completeWorkout = useCallback(async (workoutLog: WorkoutLogMeasures) => {

        await logWorkout({ ...workoutLog, weekItemWorkoutId } as WorkoutLog);
        await updateWorkout({
            weekItemId,
            weekItemWorkoutId,
            completed: true
        });

        await queryClient.invalidateQueries(Queries.getWeekItemWorkouts(weekItemId));
    }, [weekItemId, weekItemWorkoutId, updateWorkout, logWorkout, queryClient]);

    return (
        <WorkoutRunnerContext.Provider
            value={{
                completeWorkout,
                workout
            }}
        >
            {children}
        </WorkoutRunnerContext.Provider>
    );
}

export function useWorkoutRunnerContext() {

    return useContext(WorkoutRunnerContext);
}
