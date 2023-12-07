import { Typography, styled, useTheme } from '@mui/material';
import { ITheme } from 'common/App';
import { ColorHex } from 'components/CountdownTimer/useCountdown/types';
import { useCallback, useMemo, useState } from 'react';
import { Exercise } from 'types';
import { CountdownCircleTimer } from '../../../components/CountdownTimer/CountdownCircleTimer';
import { Time } from './Time';

export interface WorkoutTimerProps {

    exercise: Exercise;
    activeColour: string;
    restColour: string;
    onComplete: () => void;
}

const CenterBox = styled("div")(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
`);

const TextArea = styled("div")(({ theme }) => `
    padding: 2rem;
    border-radius:1rem;
    width: 10rem;
`);

interface RepProps {
    rep: number;
    set: number;
    duration: number;
    isRest: boolean;
}

export function WorkoutTimer({ exercise, activeColour, restColour, onComplete }: WorkoutTimerProps) {

    const theme = useTheme() as ITheme;

    const initial = useMemo(() => {
        return {
            rep: 1,
            set: 1,
            duration: exercise.repTime,
            isRest: false
        } as RepProps;
    }, [exercise]);

    const [current, setCurrent] = useState<RepProps>(initial);


    const timerComplete = useCallback(() => {

        // Finished rest between sets so start next rep
        if (current.isRest) {

            setCurrent({
                ...current,
                isRest: false,
                duration: exercise.repTime
            });
            return exercise.repTime;
        }

        // Finished last rep of set
        else if (current.rep === exercise.reps) {

            // Finished the last set so complete workout
            if (current.set === exercise.sets) {

                onComplete();
                return 0;
            }
            else {

                // Finished last rep of set so just queue a set rest
                setCurrent({
                    rep: 1,
                    set: current.set + 1,
                    isRest: true,
                    duration: exercise.setRest
                });
                return exercise.setRest;
            }
        }
        else {

            // Finished a midway rep so just queue a rep rest
            setCurrent({
                rep: current.rep + 1,
                isRest: true,
                duration: exercise.repRest,
                set: current.set
            });
            return exercise.repRest;
        }
    }, [exercise, current, setCurrent, onComplete]);



    return (<div>
        <CenterBox>
            <CountdownCircleTimer
                isPlaying
                duration={initial.duration}
                colors={(current.isRest ? theme.palette.fourth.main : theme.palette.fourth.dark) as ColorHex}
                onComplete={() => {
                    const newDuration = timerComplete();
                    return { shouldRepeat: true, newInitialRemainingTime: newDuration };
                }}
            >
                {Time}
            </CountdownCircleTimer>
        </CenterBox>
        <TextArea>
            {!(current.isRest) && (<>
                <Typography variant="subtitle1" color={theme.palette.shades.g3}>Current Set: {current.set}</Typography>
                <Typography variant="subtitle1" color={theme.palette.shades.g3}>Current Rep: {current.rep}</Typography></>
            )}
            {(current.isRest) && (<>
                <Typography variant="subtitle1">Rest</Typography>
            </>)}
        </TextArea>
    </div>);

}

export type OnComplete = {
    /** Indicates if the loop should start over. Default: false */
    shouldRepeat?: boolean

    newStartAt?: number;
}

interface RunnerProps {
    duration: number;
    onComplete: () => OnComplete;
}

