import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Typography, styled, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ITheme } from "common/App";
import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { useCountdown } from 'hooks/useCountdown';
import { useWorkoutDetails } from 'hooks/useWorkoutDetails/useWorkoutDetails';
import { SubPage } from "pages/Navigation/SubPage";
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ScheduledRoutine } from 'types';

const Wrapper = styled("div")(({ theme }) => `
    position: relative;
    background-color: ${(theme as ITheme).palette.primary.dark};
    min-height: 100vh;
    width: 100vw;
`);

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

const LowBox = styled(Box)(({ theme }) => `
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    padding:1rem;
    background-color: ${(theme as ITheme).palette.primary.light};
`);

export function WorkoutRunner() {

    const { weekItemId, weekItemWorkoutId } = useParams();

    const { data: workoutDetails } = useWorkoutDetails({ weekItemId, weekItemWorkoutId });

    const initialSeconds = useMemo(() => {

        return (workoutDetails?.estimatedCompletionMinutes ?? 0) * 60;
    }, [workoutDetails]);

    const remainingSeconds = useCountdown(initialSeconds)

    const routine = useMemo(() => workoutDetails as ScheduledRoutine, [workoutDetails]);

    const theme = useTheme();
    if (!workoutDetails) {
        return <FullpageLoadingIndicator></FullpageLoadingIndicator>;
    }
    else {
        return (
            <SubPage backLast>
                <Wrapper>
                    <TopBox>
                        <Typography variant="subtitle1">{remainingSeconds / 60}</Typography>
                    </TopBox>
                    <MidBox>
                        <Typography variant="subtitle1">"test"</Typography>
                    </MidBox>
                    <LowBox>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <ReplayIcon /> : <ReplayIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                    </LowBox>
                </Wrapper>
            </SubPage>
        );
    }
}

export default WorkoutRunner;

