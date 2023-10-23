import { FormControl, MenuItem, OutlinedInput, Select, ThemeProvider, createTheme, useTheme } from "@mui/material";
import { ITheme } from "common/App";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface CSMenuItemProps {
    value: string;
    text: string;
}

export interface CSSelectProps<TFormData extends FieldValues> {
    path: Path<TFormData>;
    label: string;
    value?: string;
    required?: boolean;
    menuItems: CSMenuItemProps[];
    register: UseFormRegister<TFormData>
}

export default function CSSelect<TFormData extends FieldValues>(props: CSSelectProps<TFormData>) {

    const theme = useTheme() as ITheme;

    const { path, label, menuItems, value, required, register } = props;

    const paperTheme = createTheme({
        components: {
            MuiPaper: {
                defaultProps: {
                    sx: {
                        backgroundColor: theme.palette.shades.g1,
                        color: theme.palette.tertiary.main,
                        borderRadius: "1rem",
                        "li": {
                            typography: theme.typography.subtitle2,
                        }
                    }
                }
            }
        }
    });
    return (
        <ThemeProvider theme={paperTheme}>
            <FormControl
                sx={{
                    '.MuiSvgIcon-root ': {
                        fill: `${(theme as ITheme).palette.tertiary.main} !important`,
                        marginTop: "-0.2rem"
                    }
                }}>
                <Select
                    {...register(path, {
                        required: required ?? false
                    })}
                    required={required}
                    value={value}
                    label={label}
                    inputProps={{
                        sx: {
                            backgroundColor: theme.palette.shades.g1,
                            color: theme.palette.tertiary.main,
                            typography: theme.typography.body1,
                        }
                    }}
                    input={<OutlinedInput margin='dense' />}
                >
                    {menuItems && menuItems.map((option, idx) => (
                        <MenuItem key={idx} value={option.value}>
                            {option.text}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    )
}
