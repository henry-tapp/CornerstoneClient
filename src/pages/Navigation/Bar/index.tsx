import { LinkPersistQuery } from "components/LinkPersistQuery";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ITheme } from "common/App";

const NavBarContainer = styled("div")(
    ({ theme }) => `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: fixed;
    overflow:hidden;
    bottom: 0;
    width: 100%;
    background-color: ${(theme as ITheme).palette.tertiary.light}
`
);

const NavBarLinkPersistQuery = styled(LinkPersistQuery)(
    ({ theme }) => `
    button {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
);

export function Bar() {
    return (
        <NavBarContainer data-testid="navbar" className="wrapper-nav-bar">
            <NavBarLinkPersistQuery pathname="/home" activeOnEmpty>
                <Button fullWidth><HomeIcon /></Button>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname="/progress">
                <Button fullWidth><BarChartIcon /></Button>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname="/account">
                <Button fullWidth><AccountCircleIcon /></Button>
            </NavBarLinkPersistQuery>
        </NavBarContainer>
    );
}
