import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { useWorkoutDetails } from 'hooks/useWorkoutDetails/useWorkoutDetails';
import { SubPage } from "pages/Navigation/SubPage";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ItemType, ScheduledActivity, ScheduledRoutine, ScheduledWorkout } from 'types';
import ActivityRunner from './ActivityRunner';
import { LogWorkoutDialog } from "./Components/LogWorkoutDialog";
import { WorkoutRunnerProvider } from "./Context/WorkoutRunnerContext";
import RoutineRunner from './RoutineRunner';

export function Index() {

    const navigate = useNavigate();

    const { weekItemId, weekItemWorkoutId } = useParams();

    const { data: workoutDetails } = useWorkoutDetails({ weekItemId, weekItemWorkoutId });

    const handleWorkoutLogged = useCallback(() => {

        setOpen(false);
        navigate("../weekview");
    }, [navigate]);

    const [open, setOpen] = useState<boolean>(false);

    if (!workoutDetails || !weekItemId || !weekItemWorkoutId) {
        return <FullpageLoadingIndicator></FullpageLoadingIndicator>;
    }
    else {
        return (
            <SubPage backLast>
                <WorkoutRunnerProvider weekItemId={weekItemId} weekItemWorkoutId={weekItemWorkoutId} workout={workoutDetails as ScheduledWorkout}>
                    {!open && workoutDetails.itemType === ItemType.Routine && <RoutineRunner routine={workoutDetails as ScheduledRoutine} onWorkoutComplete={() => setOpen(true)} />}
                    {!open && workoutDetails.itemType === ItemType.Activity && <ActivityRunner activity={workoutDetails as ScheduledActivity} onWorkoutComplete={() => setOpen(true)} />}
                    <LogWorkoutDialog open={open} onClose={handleWorkoutLogged} />
                </WorkoutRunnerProvider>
            </SubPage>
        );
    }
}

export default Index;

