import { Typography, styled } from "@mui/material";
import { GetVariation, ItemCard, WorkoutVariation } from "pages/Home/ItemCard";
import { WeeklyNavigation } from "../Navigation/WeeklyNavigation";
import { useMemo, useState } from "react";

const Wrapper = styled("div")`
  
    width: 100%;
`;

const ItemWrapper = styled("div")`
  padding-top: 5rem;
`;

const WeekDayItemContainer = styled("div")`
    width: calc(100% - 1rem);
    margin: auto;
    max-width: 30rem;
    padding-bottom: 1rem;
    padding-inline: 0.5rem 0.5rem;
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
            <ItemWrapper>
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
            </ItemWrapper>
        </Wrapper>
    );
}

export default WeekView;