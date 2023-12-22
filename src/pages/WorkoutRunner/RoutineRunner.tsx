import { useCallback, useState } from "react";
import { RoutineActivity, ScheduledRoutine } from 'types';
import ActivityRunner from "./ActivityRunner";

export interface RoutineRunnerProps {

    routine: ScheduledRoutine;
    onWorkoutComplete: () => void;
}
 
export function RoutineRunner({ routine, onWorkoutComplete }: RoutineRunnerProps) {

    const [currentActivity, setCurrentActivity] = useState<RoutineActivity>(routine.activities[0]);

    const onActivityComplete = useCallback(() => {

        if (currentActivity?.routineStep === routine.activities.length - 1) {
            onWorkoutComplete();
        }
        else {
            setCurrentActivity(routine.activities[currentActivity.routineStep + 1]);
        }
    }, [currentActivity, routine, onWorkoutComplete, setCurrentActivity]);

    if (!routine) {
        return <></>;
    }
    else {
        return (<>
            <ActivityRunner step={currentActivity.routineStep} activity={currentActivity} onWorkoutComplete={onActivityComplete} />
        </>
        );
    }
}

export default RoutineRunner;

