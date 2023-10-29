import InfoIcon from '@mui/icons-material/Info';
import { FormControl, IconButton, TextField, styled, useTheme } from "@mui/material";
import { ITheme } from "common/App";
import { CSSProperties, HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface CSTextFieldProps<T extends FieldValues> {
    path: Path<T>;
    type: HTMLInputTypeAttribute;
    label?: string;
    info?: boolean;
    required?: boolean;
    labelFont?: CSSProperties;
    inputFont?: CSSProperties;
    min?: number;
    max?: number;
    register: UseFormRegister<T>;
    handleOpenInfo?: () => void;
}

const AbsolutePositionWrapper = styled("div")(({ theme }) => `
    position: absolute;
    top: 0;
    right: 0;
`);

export default function CSSelect<TFormData extends FieldValues>({ register, path, type, label, info, required, labelFont, inputFont, handleOpenInfo }: CSTextFieldProps<TFormData>) {

    const theme = useTheme() as ITheme;

    return (
        <FormControl style={{ position: "relative" }}>
            <TextField
                {...register(path, {
                    valueAsNumber: type === "number",
                    required: required
                })}
                type={type}
                InputLabelProps={{
                    style: {
                        color: theme.palette.tertiary.main,
                    },
                    sx: {
                        color: theme.palette.tertiary.main,
                        typography: labelFont ?? theme.typography.subtitle1,
                    }
                }}
                label={label}
                InputProps={{
                    sx: {
                        backgroundColor: theme.palette.shades.g1,
                        color: theme.palette.tertiary.main,
                        typography: inputFont ?? theme.typography.body1
                    }
                }}
            />
            <AbsolutePositionWrapper>
                {/* @ts-ignore */}
                {info && (<IconButton size='small' color='tertiary' onClick={handleOpenInfo}><InfoIcon fontSize='small' /></IconButton>)}
            </AbsolutePositionWrapper>
        </FormControl>
    )
}
