import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";

export const AccountManagementButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    backgroundColor: (theme as ITheme).palette.shades.g1,
    color: (theme as ITheme).palette.primary.light,

    '&:hover, &.Mui-focusVisible': {
        backgroundColor: (theme as ITheme).palette.primary.light,
        color: (theme as ITheme).palette.primary.dark
    },
    '&.Mui-active': {
        backgroundColor: (theme as ITheme).palette.tertiary.light,
        color: (theme as ITheme).palette.primary.dark,
    }
}));
