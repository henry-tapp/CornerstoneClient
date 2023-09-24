import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from "@mui/material";

export const PasswordTextField = React.forwardRef(
  (props: TextFieldProps & { showButtonText?: boolean }, ref) => {
    const { showButtonText, ...textFieldProps } = props;
    const { t } = useTranslation();
    const [show, setShow] = useState<boolean>(false);

    const handleClickShow = useCallback(() => {
      setShow((x) => !x);
    }, []);

    return (
      <TextField
        inputRef={ref}
        {...textFieldProps}
        type={show ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {!showButtonText ? (
                <IconButton
                  type="button" // Ensure it doesn't accidentely submit the form
                  onClick={handleClickShow}
                  edge="end"
                >
                  {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ) : (
                <Button
                  type="button" // Ensure it doesn't accidentely submit the form
                  startIcon={show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  onClick={handleClickShow}
                >
                  {show ? t("hide") : t("show")}
                </Button>
              )}
            </InputAdornment>
          ),
        }}
      />
    );
  }
);
