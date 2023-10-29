import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface ActionDialogProps {
    title: string;
    description: string;
    closeText?: string;
    actionText?: string;
    open: boolean;
    disabled?: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
}

export function ActionDialog({ title, description, closeText, actionText, open, disabled, handleClose, handleSubmit, children }: React.PropsWithChildren<ActionDialogProps>) {

    return (

        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="dialog-information-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent style={{ paddingBottom: 0 }}>
                <DialogContentText variant="body2" id="dialog-information-slide-description" style={{ whiteSpace: "pre-wrap" }}>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogContent style={{ width: "100%", padding: 0 }}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{closeText ?? "Close"}</Button>
                <Button type="submit" disabled={disabled} onClick={handleSubmit}>{actionText ?? "Submit"}</Button>
            </DialogActions>
        </Dialog>
    )
}