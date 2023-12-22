import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Typography, alpha, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ITheme } from "common/App";
import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Countdown from 'react-countdown';
import { ColumnStackFlexBox } from "style/styles";
import { ScheduledActivity } from 'types';
import { CountdownRenderer } from './Components/CountdownTimer';
import Runner, { ExerciseRepProps } from './Components/Runner';
import { ButtonBar, CenterBox, Footer, MidBox, RunnerWrapper, TextArea, TopBox } from './WorkoutRunner.styles';

export interface ActivityRunnerProps {

    activity: ScheduledActivity;
    step?: number;
    onWorkoutComplete: () => void;
}

export function ActivityRunner({ step, activity, onWorkoutComplete }: ActivityRunnerProps) {

    const clockRef = useRef<Countdown>(null);
    const theme = useTheme() as ITheme;

    const [isStarted, setIsStarted] = useState<boolean>(false);

    const initial = useMemo(() => {
        return {
            rep: 1,
            set: 1,
            duration: activity.exercise.repTime,
            isRest: false,
            restType: undefined,
            isPlaying: true
        } as ExerciseRepProps;
    }, [activity]);

    const [current, setCurrent] = useState<ExerciseRepProps>(initial);

    useEffect(() => {
        setCurrent(initial)
        clockRef?.current?.start();
    }, [initial]);

    const timerComplete = useCallback(() => {

        // Finished rest between sets so start next rep
        if (current.isRest) {

            setCurrent({
                ...current,
                isRest: false,
                restType: undefined,
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
                setIsStarted(false);
                return 0;
            }
            else {

                // Finished last rep of set so just queue a set rest
                setCurrent({
                    rep: 1,
                    set: current.set + 1,
                    isRest: true,
                    restType: "Set Rest",
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
                restType: "Rep Rest",
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

            setCurrent({ ...current, isPlaying: true });
            clockRef?.current?.start();
        }
    }, [current, clockRef, timerComplete]);

    const handlePauseButtonClicked = useCallback(() => {

        if (!current.isPlaying) return;
        clockRef?.current?.pause();
        setCurrent({ ...current, isPlaying: false });

    }, [current, clockRef]);

    const handleSkipButtonClicked = useCallback(() => {

        if (!current.isPlaying) return;
        clockRef?.current?.pause();
        timerComplete();

    }, [current, clockRef, timerComplete]);


    if (!activity) {
        return <FullpageLoadingIndicator></FullpageLoadingIndicator>;
    }
    else {
        return (
            <RunnerWrapper>
                {isStarted && (<>
                    <TopBox>
                        <CenterBox>
                            <ColumnStackFlexBox>
                                <Typography variant="subtitle1" color={theme.palette.shades.g1}>{activity.name}</Typography>
                                <Typography variant="subtitle1" color={theme.palette.shades.g1}>Total Sets: {activity.exercise.sets}</Typography>
                                <Typography variant="subtitle1" color={theme.palette.shades.g1}>Total Reps: {activity.exercise.reps}</Typography>
                            </ColumnStackFlexBox>
                        </CenterBox>
                    </TopBox>
                </>)}
                <MidBox>
                    <CenterBox>
                        {!isStarted
                            ? (
                                <RunnerWrapper>
                                    <TopBox>
                                        <CenterBox>
                                            <Typography variant="subtitle1" color={theme.palette.shades.g1}>Get Ready!</Typography>
                                        </CenterBox>
                                    </TopBox>
                                    <MidBox>
                                        <CenterBox>
                                            <Countdown
                                                date={Date.now() + 5000}
                                                onComplete={() => setIsStarted(true)}
                                                renderer={CountdownRenderer}
                                            />
                                        </CenterBox>
                                    </MidBox>
                                </RunnerWrapper>)
                            : (
                                <Runner exercise={current} ref={clockRef} onExerciseComplete={timerComplete} />)}
                    </CenterBox>
                </MidBox>
                {isStarted && (<>
                    <Footer>
                        <TextArea>
                            {!(current.isRest) && (<>
                                <Typography variant="subtitle1" color={theme.palette.shades.g3}>Current Set: {current.set}</Typography>
                                <Typography variant="subtitle1" color={theme.palette.shades.g3}>Current Rep: {current.rep}</Typography></>
                            )}
                            {(current.isRest) && (<>
                                <Typography variant="subtitle1">{current.restType}</Typography>
                            </>)}
                        </TextArea>
                    </Footer>
                    <ButtonBar>
                        <Box sx={{ background: alpha(theme.palette.shades.g3, 0.5), width: "15rem", borderRadius: "1rem" }}>

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
                            <IconButton aria-label="skip-next" onClick={handleSkipButtonClicked}>
                                <SkipNextIcon sx={{
                                    height: 50,
                                    width: 50,
                                    color: theme.palette.shades.g5,
                                    borderRadius: "0.5rem"

                                }} />
                            </IconButton>
                        </Box>
                    </ButtonBar>
                </>)}
            </RunnerWrapper>
        );
    }
}

export default ActivityRunner;

