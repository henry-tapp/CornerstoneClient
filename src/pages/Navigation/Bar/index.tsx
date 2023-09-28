import { LinkPersistQuery } from "components/LinkPersistQuery";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ITheme } from "common/App";
import { useSchedule } from "hooks/useSchedule/useSchedule";
import { Schedule } from "types";
import { useMemo } from "react";

const NavBarContainer = styled("div")(
    ({ theme }) => `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    position: fixed;
    overflow:hidden;
    bottom: 0;
    width: 100%;
    background-color: ${(theme as ITheme).palette.primary.light}
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

function getCurrentWeek(schedule: Schedule): number {

    return Math.round((Date.now() - new Date(schedule.dateStarting).getTime()) / (7 * 24 * 60 * 60 * 1000));
}

export function Bar() {

    const { data } = useSchedule({});

    const currentWeek = useMemo(() => (!!data?.data) ? getCurrentWeek(data.data) : 1, [data]);

    return (
        <NavBarContainer data-testid="navbar" className="wrapper-nav-bar">
            <NavBarLinkPersistQuery pathname="/home" activeOnEmpty>
                <Button fullWidth><HomeIcon /></Button>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname={`/week/${currentWeek}`}>
                <Button fullWidth><BookIcon /></Button>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname="/progress">
                <Button fullWidth><BarChartIcon /></Button>
            </NavBarLinkPersistQuery>
            <NavBarLinkPersistQuery pathname="/account">
                <Button fullWidth><AccountCircleIcon /></Button>
            </NavBarLinkPersistQuery>
        </NavBarContainer >
    );
}
