import { SwipeableDrawerType } from "components/Drawer";
import { RefObject, createContext, useCallback, useContext } from "react";
import { WeekItemWorkout } from "types";

export interface WorkoutContextProviderProps {

    setSelectedWorkout: (weekItemWorkout?: WeekItemWorkout) => void;
    workoutDrawerRef: RefObject<SwipeableDrawerType>;
}

export interface WeekItemContextData {

    openWorkout: (workout: WeekItemWorkout) => void;
}

export const WorkoutDrawerContext = createContext<WeekItemContextData>(undefined as any);

export const WorkoutDrawerContextConsumer = WorkoutDrawerContext.Consumer;

export default function WorkoutDrawerContextProvider({ workoutDrawerRef, setSelectedWorkout, children }: React.PropsWithChildren<WorkoutContextProviderProps>) {

    const openWorkoutDrawer = useCallback((workout: WeekItemWorkout) => {

        setSelectedWorkout(workout);

        if (!workoutDrawerRef.current?.isOpen) {
            workoutDrawerRef.current?.toggleDrawer();
        }
    }, []);

    return (
        <WorkoutDrawerContext.Provider
            value={{
                openWorkout: openWorkoutDrawer
            }}
        >
            {children}
        </WorkoutDrawerContext.Provider>
    );
}

export function useWorkoutDrawer() {

    return useContext(WorkoutDrawerContext);
}