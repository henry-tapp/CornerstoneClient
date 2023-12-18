import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TimerIcon from '@mui/icons-material/Timer';
import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { LinkPersistQuery } from 'components/LinkPersistQuery';
import { useWorkoutDetails } from 'hooks/useWorkoutDetails/useWorkoutDetails';
import { SubPage } from 'pages/Navigation/SubPage';
import { useParams } from 'react-router-dom';
import { ItemType, ScheduledActivity, ScheduledRoutine } from 'types';
import StockExerciseImage from '../../images/gen/synth-climber-3.jpeg';
import ActivityDetails from './ActivityDetails';
import RoutineDetails from './RoutineDetails';

const PageWrapper = styled("div")(({ theme }) => `

    background-color: ${(theme as ITheme).palette.shades.g5};
    color: ${(theme as ITheme).palette.primary.dark};
    min-height: 100vh;
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


const IconButtonStyle = styled(IconButton)(({ theme }) => `
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    color: ${(theme as ITheme).palette.primary.dark};
`);

export function WorkoutDetails() {

    const { weekItemId, weekItemWorkoutId } = useParams();

    const { data: workoutDetails } = useWorkoutDetails({ weekItemId, weekItemWorkoutId });

    if (!workoutDetails) {
        return <></>;
    }
    return (
        <PageWrapper>
            <SubPage backLast>
                <ImageArea src={StockExerciseImage} alt=""></ImageArea>
                <ButtonBar>
                    <LinkPersistQuery pathname={`/workout/runner/${weekItemId}/${weekItemWorkoutId}`}>
                        <IconButtonStyle><TimerIcon /><Typography style={{ fontWeight: "bold" }} variant="caption">Start Workout</Typography></IconButtonStyle>
                    </LinkPersistQuery>
                    <IconButtonStyle><ContentPasteIcon /><Typography style={{ fontWeight: "bold" }} variant="caption">Log Workout</Typography></IconButtonStyle>
                </ButtonBar>

                {workoutDetails.itemType === ItemType.Routine && <RoutineDetails routine={workoutDetails as ScheduledRoutine} />}
                {workoutDetails.itemType === ItemType.Activity && <ActivityDetails activity={workoutDetails as ScheduledActivity} />}
            </SubPage>
        </PageWrapper>
    );
}

export default WorkoutDetails;
