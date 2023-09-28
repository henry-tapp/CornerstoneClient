import { useCallback, useMemo, useState } from "react";

import { Button, styled } from "@mui/material";

import { ITheme } from "common/App";
import { LinkPersistQuery } from "components/LinkPersistQuery";
import { GetVariation, Item, WeekDay, WeekDays } from "types/Item";
import { WeeklyNavigation } from "../Navigation/WeeklyNavigation";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import WeekDayAccordion from "./WeekDayAccordion";

const Wrapper = styled("div")(({ theme }) => `
    background: ${(theme as ITheme).palette.shades.g5};
`);

const NavBarContainer = styled("div")(
    ({ theme }) => `
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  gap: 1rem;
`
);

const NavBarLinkPersistQuery = styled(LinkPersistQuery)(
    ({ theme }) => `
  width: 100%;

  button {
    height: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    border-radius: 1rem;
    background-color: ${(theme as ITheme).palette.tertiary.light};
    color:  ${(theme as ITheme).palette.shades.g1};
  }

  &:last-child > button {
    border-right: none;
  }

  &.active > button {
    background-color: ${theme.vars.palette.secondary.main};
    color: ${theme.vars.palette.secondary.contrastText};
  }
`
);

const NavButtonWrapper = styled("div")`
  padding-top: 5rem;
`;

const INITIAL_WEEK = 10;

function useMockWeekData() {

    return [{
        weekNumber: INITIAL_WEEK,
        items: {
            "Monday": [{
                id: 3,
                name: "5x3 SI",
                shortDescription: "Boulder protocol",
                variation: GetVariation("Strength & Power"),
                exercises: 1,
                estimatedCompletionMinutes: 45
            } as Item] as Item[],
            "Tuesday": [{
                id: 2,
                name: "Pull Ups",
                shortDescription: "Hypertrophy",
                variation: GetVariation("Conditioning"),
                exercises: 1,
                estimatedCompletionMinutes: 7
            } as Item,
            {
                id: 1,
                name: "Hamstring stretches",
                shortDescription: "Flexibility",
                variation: GetVariation("Conditioning"),
                exercises: 4,
                estimatedCompletionMinutes: 12
            } as Item] as Item[]
        } as Record<WeekDay, Item[]>
    }]
}

export function WeekView() {

    const { currentWeek } = useParams();

    const [weekNumber, setWeek] = useState<number>(parseInt(currentWeek ?? "1"));

    const weeks = useMockWeekData();

    const currentWeekItems = useMemo(() => weeks.find(x => x.weekNumber === weekNumber)?.items, [weeks, weekNumber]);

    let navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const handleWeekSet = useCallback((newWeek: number) => {
        navigate(`../week/${newWeek}?${searchParams}`, { replace: true });
        setWeek(newWeek);
    }, [setWeek, navigate, searchParams]);

    return (
        <Wrapper className="weekview-wrapper">
            <WeeklyNavigation weekNumber={weekNumber} setWeek={handleWeekSet} />
            <NavButtonWrapper>
                <NavBarContainer data-testid="navbar" className="wrapper-nav-bar">
                    <NavBarLinkPersistQuery pathname="manage" activeOnEmpty>
                        <Button fullWidth><AddCircleIcon /><span>Manage</span></Button>
                    </NavBarLinkPersistQuery>
                    <NavBarLinkPersistQuery pathname={`plan`}>
                        <Button fullWidth><CalendarMonthIcon /><span>Plan</span></Button>
                    </NavBarLinkPersistQuery>
                    <NavBarLinkPersistQuery pathname="diary">
                        <Button fullWidth><BookIcon />Notes</Button>
                    </NavBarLinkPersistQuery>
                </NavBarContainer>
            </NavButtonWrapper>
            {currentWeekItems && WeekDays.map((day, idx) => {
                return (<WeekDayAccordion key={idx} day={day as WeekDay} items={Object.entries(currentWeekItems).find(items => items[0] === day)?.[1]} />);
            })
            }
        </Wrapper >
    );
}

export default WeekView;