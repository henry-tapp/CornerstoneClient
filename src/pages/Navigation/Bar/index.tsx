import { LinkPersistQuery } from "components/LinkPersistQuery";

import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";

const NavBarContainer = styled("div")(
    ({ theme }) => `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: fixed;
    overflow: hidden;
    padding-bottom: 0.75rem;
    padding-top: 0.5rem;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(${(theme as ITheme).palette.primary.main}, ${(theme as ITheme).palette.primary.dark});
    border-radius: 1rem 1rem 0 0 ;
    z-index:200;
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
    backgroundColor: (theme as ITheme).palette.shades.g5,
    color: (theme as ITheme).palette.secondary.dark,
    '&:hover, &.Mui-focusVisible': {
        backgroundColor: (theme as ITheme).palette.shades.g1,
        color: (theme as ITheme).palette.tertiary.dark

    },
    '&.Mui-active': {
        backgroundColor: (theme as ITheme).palette.tertiary.light,
        color: (theme as ITheme).palette.primary.dark,
    }
}));

export function Bar() {

    return (
        <NavBarContainer data-testid="navbar" className="wrapper-nav-bar">
            <NavBarLinkPersistQuery pathname="/" activeOnEmpty>
                <IconButtonStyle><HomeIcon /></IconButtonStyle>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname={`schedule`}>
                <IconButtonStyle><CalendarTodayIcon /></IconButtonStyle>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname="/progress">
                <IconButtonStyle><BarChartRoundedIcon /></IconButtonStyle>
            </NavBarLinkPersistQuery>
        </NavBarContainer >
    );
}
