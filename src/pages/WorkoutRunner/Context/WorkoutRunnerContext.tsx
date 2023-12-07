import { useWorkoutUpdates } from "hooks/useWorkoutUpdates/useWorkoutUpdates";
import { WorkoutCompleteProps } from "hooks/useWorkoutUpdates/useWorkoutUpdates.types";
import { createContext, useCallback, useContext } from "react";
import { ScheduledWorkout } from "types";
import { WorkoutLog } from "types/WorkoutLog";


export interface WorkoutRunnerContextData {
    workout: ScheduledWorkout;
    onWorkoutComplete: () => void;
    logWorkout: (workoutLog: WorkoutLog) => Promise<void>;
}

export interface WorkoutRunnerProviderProps {
    weekItemId: string;
    weekItemWorkoutId: string;
    workout: ScheduledWorkout;
    onWorkoutComplete: () => void;
}

export const WorkoutRunnerContext = createContext<WorkoutRunnerContextData>(undefined as any);

export const WorkoutRunnerContextConsumer = WorkoutRunnerContext.Consumer;

export function WorkoutRunnerProvider({ workout, weekItemId, weekItemWorkoutId, onWorkoutComplete, children }: React.PropsWithChildren<WorkoutRunnerProviderProps>) {

    const { updateWorkout } = useWorkoutUpdates();

    const logWorkout = useCallback(async (workoutLog: WorkoutLog) => {

        const updateWorkoutProps: WorkoutCompleteProps = {
            workoutUpdate: {
                weekItemId,
                weekItemWorkoutId,
                complete: true
            },
            workoutLog: workoutLog
        };

        await updateWorkout(updateWorkoutProps);
    }, [weekItemId, weekItemWorkoutId, updateWorkout]);

    return (
        <WorkoutRunnerContext.Provider
            value={{
                onWorkoutComplete,
                logWorkout,
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
