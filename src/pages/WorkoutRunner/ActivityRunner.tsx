import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Typography, alpha, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ITheme } from "common/App";
import { CountdownCircleTimer } from "components/CountdownTimer/CountdownCircleTimer";
import { ColorHex } from "components/CountdownTimer/useCountdown/types";
import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { useCallback, useMemo, useState } from "react";
import { ColumnStackFlexBox } from "style/styles";
import { ScheduledActivity } from 'types';
import { Time } from "./Components/Time";
import { useWorkoutRunnerContext } from "./Context/WorkoutRunnerContext";
import { ButtonBar, CenterBox, Footer, MidBox, RunnerWrapper, TextArea, TopBox } from './WorkoutRunner.styles';
export interface ExerciseRepProps {
    rep: number;
    set: number;
    duration: number;
    isRest: boolean;
    isPlaying: boolean;
}

export interface ActivityRunnerProps {

    activity: ScheduledActivity;
}

export function ActivityRunner({ activity }: ActivityRunnerProps) {

    const theme = useTheme() as ITheme;

    const { onWorkoutComplete } = useWorkoutRunnerContext();

    const initial = useMemo(() => {
        return {
            rep: 1,
            set: 1,
            duration: activity.exercise.repTime,
            isRest: false,
            isPlaying: true
        } as ExerciseRepProps;
    }, [activity]);

    const [current, setCurrent] = useState<ExerciseRepProps>(initial);

    const timerComplete = useCallback(() => {

        // Finished rest between sets so start next rep
        if (current.isRest) {

            setCurrent({
                ...current,
                isRest: false,
                duration: activity.exercise.repTime,
                isPlaying: activity.exercise.repTime > 0
            });
            return activity.exercise.repTime;
        }

        // Finished last rep of set
        else if (current.rep === activity.exercise.reps) {

            // Finished the last set so complete workout
            if (current.set === activity.exercise.sets) {

                onWorkoutComplete();
                return 0;
            }
            else {

                // Finished last rep of set so just queue a set rest
                setCurrent({
                    rep: 1,
                    set: current.set + 1,
                    isRest: true,
                    duration: activity.exercise.setRest,
                    isPlaying: activity.exercise.setRest > 0
                });
                return activity.exercise.setRest;
            }
        }
        else {

            // Finished a midway rep so just queue a rep rest
            setCurrent({
                ...current,
                rep: current.rep + 1,
                isRest: true,
                duration: activity.exercise.repRest,
                isPlaying: activity.exercise.repRest > 0
            });
            return activity.exercise.repRest;
        }
    }, [activity, current, setCurrent, onWorkoutComplete]);

    const handlePlayButtonClicked = useCallback(() => {

        if (current.duration === 0) {
            timerComplete();
        }
        else {

            setCurrent({
                ...current,
                isPlaying: true
            });
        }
    }, [current, setCurrent, timerComplete]);

    const handlePauseButtonClicked = useCallback(() => {

        if (!current.isPlaying) return;
        setCurrent({
            ...current,
            isPlaying: false
        });

    }, [current, setCurrent]);

    if (!activity) {
        return <FullpageLoadingIndicator></FullpageLoadingIndicator>;
    }
    else {
        return (
            <RunnerWrapper>
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
                    <CenterBox>
                        <CountdownCircleTimer
                            isPlaying={current.isPlaying}
                            duration={initial.duration}
                            colors={(current.isRest ? theme.palette.fourth.main : theme.palette.fourth.dark) as ColorHex}
                            onComplete={() => {
                                const newDuration = timerComplete();
                                return { shouldRepeat: false, newInitialRemainingTime: newDuration }
                            }}
                        >
                            {Time}
                        </CountdownCircleTimer>
                    </CenterBox>
                </MidBox>
                <Footer>
                    <TextArea>
                        {!(current.isRest) && (<>
                            <Typography variant="subtitle1" color={theme.palette.shades.g3}>Current Set: {current.set}</Typography>
                            <Typography variant="subtitle1" color={theme.palette.shades.g3}>Current Rep: {current.rep}</Typography></>
                        )}
                        {(current.isRest) && (<>
                            <Typography variant="subtitle1">Rest</Typography>
                        </>)}
                    </TextArea>
                </Footer>
                <ButtonBar>
                    <Box sx={{ background: alpha(theme.palette.shades.g3, 0.5), width: "15rem", borderRadius: "1rem" }}>
                        <IconButton aria-label="repeat">
                            <SkipPreviousIcon sx={{
                                height: 50,
                                width: 50,
                                color: theme.palette.shades.g5,
                                borderRadius: "0.5rem"
                            }} />
                        </IconButton>
                        {!current.isPlaying && (<IconButton aria-label="play/pause" onClick={handlePlayButtonClicked}>
                            <PlayArrowIcon sx={{
                                height: 50,
                                width: 50,
                                color: theme.palette.shades.g5,
                                borderRadius: "0.5rem"

                            }} />
                        </IconButton>)}
                        {current.isPlaying && (<IconButton aria-label="play/pause" onClick={handlePauseButtonClicked}>
                            <PauseIcon sx={{
                                height: 50,
                                width: 50,
                                color: theme.palette.shades.g5,
                                borderRadius: "0.5rem"

                            }} />
                        </IconButton>)}
                        <IconButton aria-label="skip-next">
                            <SkipNextIcon sx={{
                                height: 50,
                                width: 50,
                                color: theme.palette.shades.g5,
                                borderRadius: "0.5rem"

                            }} />
                        </IconButton>
                    </Box>
                </ButtonBar>
            </RunnerWrapper>
        );
    }
}

export default ActivityRunner;

