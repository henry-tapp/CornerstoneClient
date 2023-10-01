import { LinkPersistQuery } from "components/LinkPersistQuery";

import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

import HomeIcon from '@mui/icons-material/Home';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { ITheme } from "common/App";

const NavBarContainer = styled("div")(
    ({ theme }) => `
    display: grid;
    grid-template-columns: 1fr 1fr  1fr;
    position: fixed;
    overflow:hidden;
    padding-bottom: 1rem;
    bottom: 0;
    width: 100%;
`);

const NavBarLinkPersistQuery = styled(LinkPersistQuery)(
    ({ theme }) => `
    button {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`);

const IconButtonStyle = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    backgroundColor: (theme as ITheme).palette.shades.g6,
    color: (theme as ITheme).palette.secondary.dark,

    '&:hover, &.Mui-focusVisible': {
        backgroundColor: (theme as ITheme).palette.tertiary.light,
        color: (theme as ITheme).palette.primary.dark

    },
    '&.Mui-active': {
        backgroundColor: (theme as ITheme).palette.tertiary.light,
        color: (theme as ITheme).palette.primary.dark,
    }
}));


export function Bar() {

    return (
        <NavBarContainer data-testid="navbar" className="wrapper-nav-bar">
            <NavBarLinkPersistQuery pathname="/home" activeOnEmpty>
                <IconButtonStyle><HomeIcon /></IconButtonStyle>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname={`schedule/today`}>
                <IconButtonStyle><AddCircleRoundedIcon /></IconButtonStyle>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname="/progress">
                <IconButtonStyle sx={{
                    ":focus": {
                        background: "lightblue"
                    }
                }}><BarChartRoundedIcon /></IconButtonStyle>
            </NavBarLinkPersistQuery>
        </NavBarContainer >
    );
}
