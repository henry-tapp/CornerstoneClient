import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, styled, useTheme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ITheme } from "common/App";
import CSSlider from "components/FormItems/CSSilder";
import React, { useCallback, useState } from "react";
import { Wrapper } from "style/styles";
import { WorkoutLog, WorkoutLogMeasures } from "types/WorkoutLog";
import { useWorkoutRunnerContext } from "../Context/WorkoutRunnerContext";

const FlexBox = styled("div")`
    border-radius: 0 0 1rem 1rem;
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled("div")`
    position: relative;
    display:flex;
    flex-direction: column;
    width: calc(100%- 5rem);
    gap: 2rem;
    margin: auto;
    width: calc(100% - 2rem);
    max-width: 40rem;
    padding-inline: 1rem 1rem;
    padding-top:1rem;
`

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface LogWorkoutDialogProps {

    open: boolean;
    onClose: () => void;
}

export function LogWorkoutDialog({ open, onClose: handleClose }: LogWorkoutDialogProps) {

    const theme = useTheme() as ITheme;

    const { workout, completeWorkout } = useWorkoutRunnerContext();

    const [workoutLog, setWorkoutLog] = useState<WorkoutLogMeasures | undefined>({ effort: workout.exercise?.rpe ?? 5, notes: "" });

    const handleSave = useCallback(async () => {
        if (workoutLog) {
            await completeWorkout(workoutLog);
            handleClose();
        }
    }, [workoutLog, completeWorkout, handleClose]);

    return (
        <Wrapper>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClose()}
                aria-describedby="dialog-information-description"
                PaperProps={{
                    style: {
                        background: theme.palette.shades.g5,
                        color: theme.palette.shades.g1
                    },
                }}
            >
                <DialogTitle style={{ textAlign: 'center' }}>Workout Complete! How did that feel?</DialogTitle>
                <DialogContent style={{ textAlign: 'center', margin: 'auto' }}>
                    <FlexBox>
                        <FormContainer>
                            <CSSlider
                                onChange={(v) => setWorkoutLog({ ...workoutLog, effort: v } as WorkoutLog)}
                                min={0}
                                max={10}
                                marks
                                step={1}
                                defaultValue={workout.exercise?.rpe ?? 5} />
                        </FormContainer>
                    </FlexBox>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={handleSave}>{"Save Workout"}</Button>
                </DialogActions>
            </Dialog >
        </Wrapper>
    )
}

