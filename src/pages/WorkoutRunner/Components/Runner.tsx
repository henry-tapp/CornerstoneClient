import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import React, { useRef } from "react";
import Countdown, { CountdownTimeDelta } from 'react-countdown';
import { CountdownRenderer } from "./CountdownTimer";

export interface ExerciseRepProps {
    rep: number;
    set: number;
    duration: number;
    isRest: boolean;
    restType: string | undefined;
    isPlaying: boolean;
}

export interface RunnerProps {
    exercise: ExerciseRepProps;
    onExerciseComplete: () => void;
}

const Runner = React.forwardRef<Countdown, RunnerProps>((props, ref) => {

    const { exercise, onExerciseComplete } = props;

    if (!exercise) {
        return <FullpageLoadingIndicator></FullpageLoadingIndicator>;
    }
    else {
        return (
            <Countdown
                ref={ref}
                date={Date.now() + (exercise.duration * 1000)}
                autoStart={exercise.duration > 0}
                key={exercise.duration}
                onComplete={(timeDelta: CountdownTimeDelta, completedOnStart: boolean) => onExerciseComplete()}
                renderer={CountdownRenderer}
            />
        );
    }
});

export default Runner;

