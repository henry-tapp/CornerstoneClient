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

export interface InfoDialogProps {
    title?: string;
    description?: string;
    description2?: string;
    closeText?: string;
    open: boolean;
    handleClose: () => void;
}

export function InfoDialog({ title, description, closeText, open, handleClose, children }: React.PropsWithChildren<InfoDialogProps>) {

    return (

        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="dialog-information-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText variant="body2" id="dialog-information-slide-description" style={{ whiteSpace: "pre-wrap" }}>
                    {description}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{closeText ?? "Close"}</Button>
            </DialogActions>
        </Dialog>
    )
}