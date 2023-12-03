import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import TimerIcon from '@mui/icons-material/Timer';
import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { LinkPersistQuery } from 'components/LinkPersistQuery';
import { useWorkoutDetails } from 'hooks/useWorkoutDetails/useWorkoutDetails';
import { useMemo } from 'react';
import { ScheduledActivity, ScheduledRoutine, WeekItemWorkout } from 'types';
import StockExerciseImage from '../../images/gen/synth-climber-3.jpeg';

const BackIconWrapper = styled(IconButton)(
    ({ theme }) => `
  position: absolute;
  left: 1rem;
  top: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(186, 186, 186, 0.75);
`);

const PageWrapper = styled("div")(({ theme }) => `

    background-color: ${(theme as ITheme).palette.shades.g5};
    color: ${(theme as ITheme).palette.primary.dark};
    height: 100vh;
`);

const ImageArea = styled("img")(({ theme }) => `
    width: 100%;
    margin-bottom: -2rem;
`);

const ButtonBar = styled("div")(({ theme }) => `
    height: 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${(theme as ITheme).palette.shades.g5};
    z-index:0;
    position:relative;
    border-radius: 2rem 2rem 0 0;
    transition: all 1s;
`);

const Description = styled("div")(({ theme }) => `
    padding:1rem;
`);

const IconButtonStyle = styled(IconButton)(({ theme }) => `
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    color: ${(theme as ITheme).palette.primary.dark};
`);

const Inline = styled("div")(
    ({ theme }) => `
    display: flex;
    align-items: center
  `
);

export interface ItemDetailProps {
    workout: WeekItemWorkout;
    onBack?: () => void;
}

export function WorkoutDetails({ workout, onBack }: ItemDetailProps) {

    const { data: workoutDetails } = useWorkoutDetails({ weekItemId: workout.weekItemId, weekItemWorkoutId: workout.id });

    const routine = useMemo(() => workoutDetails as ScheduledRoutine, [workoutDetails]);
    const activity = useMemo(() => workoutDetails as ScheduledActivity, [workoutDetails]);

    return (
        <PageWrapper>
            {onBack && (<BackIconWrapper onClick={onBack}><KeyboardBackspaceOutlinedIcon /></BackIconWrapper>)}
            <ImageArea src={StockExerciseImage} alt=""></ImageArea>
            <ButtonBar>
                <LinkPersistQuery pathname={`/workout/${workout.weekItemId}/${workout.id}`}>
                    <IconButtonStyle><TimerIcon /><Typography style={{ fontWeight: "bold" }} variant="caption">Start Workout</Typography></IconButtonStyle>
                </LinkPersistQuery>
                <IconButtonStyle><ContentPasteIcon /><Typography style={{ fontWeight: "bold" }} variant="caption">Log Workout</Typography></IconButtonStyle>
            </ButtonBar>
            {routine && <RoutineDetails workout={workout} routine={routine} />}
            {activity && <ActivityDetails workout={workout} activity={activity} />}

        </PageWrapper>
    );
}

export default WorkoutDetails;
