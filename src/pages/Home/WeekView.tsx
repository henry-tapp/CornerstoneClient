import { useMemo, useState } from "react";

import { Button, Typography, styled } from "@mui/material";

import { ITheme } from "common/App";
import { LinkPersistQuery } from "components/LinkPersistQuery";
import { GetVariation, WorkoutVariation } from "types/Item";
import { WeeklyNavigation } from "./WeeklyNavigation";
import { ItemCard } from "./ItemCard";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';

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
    background-color: ${(theme as ITheme).palette.shades.g4}
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
const Wrapper = styled("div")`
    width: 100%;
`;

const NavButtonWrapper = styled("div")`
  padding-top: 5rem;
`;

const WeekDayItemContainer = styled("div")`
    width: calc(100% - 1rem);
    margin: auto;
    max-width: 30rem;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap:0.25rem;
`;


const INITIAL_WEEK = 1;

function useMockWeekData() {

    return [{
        weekNumber: INITIAL_WEEK,
        items: {
            "Monday": [{
                id: 3,
                name: "5x3 SI",
                description: "Boulder protocol",
                variation: GetVariation("Strength & Power"),
                exercises: 1,
                estimatedCompletionMinutes: 45
            } as Item] as Item[],
            "Tuesday": [{
                id: 2,
                name: "Pull Ups",
                description: "Hypertrophy",
                variation: GetVariation("Conditioning"),
                exercises: 1,
                estimatedCompletionMinutes: 7
            } as Item,
            {
                id: 1,
                name: "Hamstring stretches",
                description: "Flexibility",
                variation: GetVariation("Conditioning"),
                exercises: 4,
                estimatedCompletionMinutes: 12
            } as Item] as Item[]
        } as Record<string, Item[]>
    }]
}

export type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface Item {
    id: number;
    name: string;
    description: string;
    variation: WorkoutVariation;
    exercises: number;
    estimatedCompletionMinutes: number;
}

export function WeekView() {

    const [weekNumber, setWeek] = useState<number>(INITIAL_WEEK);

    const weeks = useMockWeekData();

    const currentWeekItems = useMemo(() => weeks.find(x => x.weekNumber === weekNumber)?.items, [weeks, weekNumber]);

    return (
        <Wrapper className="weekview-wrapper">
            <WeeklyNavigation weekNumber={weekNumber} setWeek={setWeek} />
            <NavButtonWrapper>
                <NavBarContainer data-testid="navbar" className="wrapper-nav-bar">
                    <NavBarLinkPersistQuery pathname="manage" activeOnEmpty>
                        <Button fullWidth><AddCircleIcon /><span>Manage</span></Button>
                    </NavBarLinkPersistQuery>
                    <NavBarLinkPersistQuery pathname="plan">
                        <Button fullWidth><CalendarMonthIcon /><span>Plan</span></Button>
                    </NavBarLinkPersistQuery>
                    <NavBarLinkPersistQuery pathname="diary">
                        <Button fullWidth><BookIcon />Notes</Button>
                    </NavBarLinkPersistQuery>
                </NavBarContainer>
            </NavButtonWrapper>
            {currentWeekItems && Object.entries(currentWeekItems).map((weekDayItems, idx) => {
                return (
                    <WeekDayItemContainer key={idx} className="weekday-item-container">
                        <Typography variant="h4" style={{ fontWeight: "bold" }}> {weekDayItems[0]}</Typography>
                        {weekDayItems[1] && weekDayItems[1].map((item, idx2) => {
                            return (<ItemCard key={idx2} {...item}></ItemCard>)
                        })}
                    </WeekDayItemContainer>
                );
            })
            }
        </Wrapper>
    );
}

export default WeekView;