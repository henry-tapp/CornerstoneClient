import { Typography, styled, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import { ITheme } from "common/App";
import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { WorkoutTimer } from "pages/WorkoutRunner/Components/WorkoutTimer";
import { ColumnStackFlexBox, Wrapper } from "style/styles";
import { ScheduledActivity } from 'types';
import { useWorkoutRunnerContext } from "./Context/WorkoutRunnerContext";

const CenterBox = styled("div")(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`);

const TopBox = styled(Box)(({ theme }) => `
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    width: 25rem;
    
`);

const MidBox = styled(Box)(({ theme }) => `
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    padding:1rem;
    text-align:center;
`);

export interface ActivityRunnerProps {

    activity: ScheduledActivity;
}

export function ActivityRunner({ activity }: ActivityRunnerProps) {

    const theme = useTheme() as ITheme;

    const { onWorkoutComplete } = useWorkoutRunnerContext();

    if (!activity) {
        return <FullpageLoadingIndicator></FullpageLoadingIndicator>;
    }
    else {
        return (
            <Wrapper>
                <TopBox>
                    <CenterBox>
                        <ColumnStackFlexBox>
                            <Typography variant="subtitle1" color={theme.palette.shades.g1}>{activity.name}</Typography>
                            <Typography variant="subtitle1" color={theme.palette.shades.g1}>Total Sets: {activity.exercise.sets}</Typography>
                            <Typography variant="subtitle1" color={theme.palette.shades.g1}>Total Reps: {activity.exercise.reps}</Typography>
                        </ColumnStackFlexBox>
                    </CenterBox>
                </TopBox>
                <MidBox>
                    <WorkoutTimer exercise={activity.exercise} activeColour={theme.palette.fourth.dark} restColour={theme.palette.fourth.main} onComplete={onWorkoutComplete} />
                </MidBox>
            </Wrapper>
        );
    }
}

export default ActivityRunner;

