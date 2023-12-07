import { Typography, styled, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import { ITheme } from "common/App";
import { useCallback, useState } from "react";
import { Wrapper } from "style/styles";
import { RoutineActivity, ScheduledRoutine } from 'types';
import { WorkoutTimer } from "./Components/WorkoutTimer";
import { useWorkoutRunnerContext } from "./Context/WorkoutRunnerContext";

const TopBox = styled(Box)(({ theme }) => `
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
`);

const MidBox = styled(Box)(({ theme }) => `
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    padding:1rem;
    text-align:center;
    background-color: ${(theme as ITheme).palette.primary.light};
`);


export interface RoutineRunnerProps {

    routine: ScheduledRoutine;
}

export function RoutineRunner({ routine }: RoutineRunnerProps) {

    const [currentActivity, setCurrentActivity] = useState<RoutineActivity>(routine.activities[0]);

    const { onWorkoutComplete } = useWorkoutRunnerContext();

    const onActivityComplete = useCallback(() => {

        if (currentActivity?.routineStep === routine.activities.length) {
            onWorkoutComplete();
        }
        else {
            setCurrentActivity(routine.activities[currentActivity.routineStep]);
        }
    }, [currentActivity, routine, onWorkoutComplete, setCurrentActivity]);

    const theme = useTheme() as ITheme;

    if (!routine) {
        return <></>;
    }
    else {
        return (
            <Wrapper>
                <TopBox>
                    <Typography variant="subtitle1">{routine.name}</Typography>
                </TopBox>
                <MidBox>
                    <WorkoutTimer exercise={currentActivity.exercise} activeColour={theme.palette.fourth.dark} restColour={theme.palette.fourth.main} onComplete={onActivityComplete} />
                </MidBox>
            </Wrapper>
        );
    }
}

export default RoutineRunner;

