import { Typography, useTheme } from "@mui/material";
import { ITheme } from 'common/App';
import { CountdownCircleTimer } from "components/CountdownTimer/CountdownCircleTimer";
import { ColorHex } from "components/CountdownTimer/useCountdown/types";
import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { useWorkoutDetails } from 'hooks/useWorkoutDetails/useWorkoutDetails';
import { SubPage } from "pages/Navigation/SubPage";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ItemType, ScheduledActivity, ScheduledRoutine, ScheduledWorkout } from 'types';
import ActivityRunner from './ActivityRunner';
import { LogWorkoutDialog } from "./Components/LogWorkoutDialog";
import { Time } from "./Components/Time";
import { WorkoutRunnerProvider } from "./Context/WorkoutRunnerContext";
import RoutineRunner from './RoutineRunner';
import { CenterBox, MidBox, RunnerWrapper, TopBox } from "./WorkoutRunner.styles";


export function Index() {

    const navigate = useNavigate();

    const theme = useTheme() as ITheme;

    const [isStarted, setIsStarted] = useState<boolean>(false);

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
                <WorkoutRunnerProvider weekItemId={weekItemId} weekItemWorkoutId={weekItemWorkoutId} workout={workoutDetails as ScheduledWorkout} onWorkoutComplete={() => setOpen(true)}>
                    {!isStarted &&
                        (
                            <RunnerWrapper>
                                <TopBox>
                                    <CenterBox>
                                        <Typography variant="subtitle1" color={theme.palette.shades.g1}>Get Ready!</Typography>
                                    </CenterBox>
                                </TopBox>
                                <MidBox>
                                    <CenterBox>
                                        <CountdownCircleTimer
                                            isPlaying
                                            duration={5}
                                            colors={theme.palette.primary.main as ColorHex}
                                            onComplete={() => {
                                                setIsStarted(true);
                                                return { shouldRepeat: false };
                                            }}
                                        >
                                            {Time}
                                        </CountdownCircleTimer>
                                    </CenterBox>
                                </MidBox>
                            </RunnerWrapper>
                        )
                    }
                    {isStarted && workoutDetails.itemType === ItemType.Routine && <RoutineRunner routine={workoutDetails as ScheduledRoutine} />}
                    {isStarted && workoutDetails.itemType === ItemType.Activity && <ActivityRunner activity={workoutDetails as ScheduledActivity} />}
                    <LogWorkoutDialog open={open} onClose={handleWorkoutLogged} />
                </WorkoutRunnerProvider>
            </SubPage>
        );
    }
}

export default Index;

