import { PropsWithChildren } from "react";

import { Alert as MuiAlert, AlertProps } from "@mui/material";

/**
 * Wrapping the MUI Alert so we can customise this to our liking
 * if required (primarily styling etc).
 */
export function Alert({ children, ...props }: PropsWithChildren<AlertProps>) {
  return (
    <MuiAlert elevation={2} {...props}>
      {children}
    </MuiAlert>
  );
}
