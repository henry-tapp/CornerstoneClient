import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, styled, useTheme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ITheme } from "common/App";
import CSTextField from "components/FormItems/CSTextField";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Wrapper } from "style/styles";
import { WorkoutLog } from "types/WorkoutLog";
import image from '../../../images/gen/real-bw-boulderer-2.jpeg';
import { useWorkoutRunnerContext } from "../Context/WorkoutRunnerContext";

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

    const { workout, logWorkout } = useWorkoutRunnerContext();

    const {
        register,
        handleSubmit
    } = useForm<WorkoutLog>({
        mode: "onChange"
    });

    const handleSave = useCallback(async () => {
        handleSubmit(async (log: WorkoutLog) => await logWorkout(log));
        handleClose();
    }, [logWorkout, handleClose, handleSubmit]);

    return (
        <Wrapper>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClose()}
                aria-describedby="dialog-information-description"
                fullScreen
                PaperProps={{
                    style: {
                        background: 'none',
                        backgroundImage: image,
                        boxShadow: 'none',
                        color: theme.palette.shades.g1
                    },
                }}
            >
                <DialogTitle>Workout Complete! How did that feel?</DialogTitle>
                <DialogContent>
                    <FlexBox>
                        <FormContainer>
                            <CSTextField register={register} path="effort" required label="Relative Effort" type="number" />
                        </FormContainer>
                    </FlexBox>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSave()}>{"Save Workout"}</Button>
                </DialogActions>
            </Dialog >
        </Wrapper>
    )
}


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
