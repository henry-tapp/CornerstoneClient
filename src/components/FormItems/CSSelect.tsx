import { FormControl, FormHelperText, MenuItem, OutlinedInput, Select, SelectChangeEvent, ThemeProvider, alpha, createTheme, useTheme } from "@mui/material";
import { ITheme } from "common/App";

export interface CSMenuItemProps {
    value: string | number;
    text: string;
}

export interface CSSelectProps {
    label: string;
    type?: string;
    required?: boolean;
    helperText?: string;
    defaultValue?: string;
    menuItems: CSMenuItemProps[];
    setValue: (v: string) => void;
}

export default function CSSelect(props: CSSelectProps) {

    const theme = useTheme() as ITheme;

    const { label, menuItems, required, helperText, defaultValue, setValue } = props;

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };


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
                        marginTop: "0.4rem"
                    }
                }}>
                {helperText && (<FormHelperText sx={{
                    backgroundColor: alpha(theme.palette.shades.g1, 1),
                    color: theme.palette.tertiary.main,
                    typography: theme.typography.body1,
                    paddingTop: "0.25rem",
                    paddingInline: "0.9rem 1rem",
                    borderRadius: "0.5rem 0.5rem 0 0",
                    marginBottom: "-1.25rem",
                    marginLeft: "0",
                    marginRight: "0",
                    borderBottom: `0.1rem solid ${theme.palette.shades.g3}`,
                    zIndex: 2

                }}>{helperText}</FormHelperText>)}

                <Select
                    required={required}
                    label={label}
                    defaultValue={defaultValue}
                    inputProps={{
                        sx: {
                            backgroundColor: theme.palette.shades.g1,
                            color: theme.palette.tertiary.main,
                            typography: theme.typography.body1,
                            paddingTop: helperText && "2rem",
                        }
                    }}
                    onChange={handleChange}
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
