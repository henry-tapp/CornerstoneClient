import { days } from "types/Item";
import { useCallback, useMemo } from "react";
import { WeeklyNavigation } from "pages/Navigation/WeeklyNavigation";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { useScheduleWeek } from "hooks/useSchedule/useSchedule";
import { ViewProps, getCurrentWeek } from "../index.types";
import { Typography, styled } from "@mui/material";
import ItemView from "../ItemView";

const Wrapper = styled("div")(
    ({ theme }) => `
    padding-top: 5rem;
`
);

export function WeekView({ schedule }: ViewProps) {

    const currentWeek = useMemo(() => (!!schedule.weekStarting) ? getCurrentWeek(new Date(schedule.weekStarting)) : 1, [schedule]);

    const [navigatedWeek, setWeek] = useLocalStorage("navigatedWeek", currentWeek);

    const { data: weekData } = useScheduleWeek({ WeekNumber: navigatedWeek });

    const handleWeekSet = useCallback((newWeek: number) => {
        setWeek(newWeek);
    }, [setWeek]);

    return (
        <>
            <WeeklyNavigation weekNumber={navigatedWeek} setWeek={handleWeekSet} />
            <Wrapper>
                {days.map((day, idx) =>
                    <>
                        <Typography paddingLeft={"1.5rem"} variant="h4">{day}</Typography>
                        {weekData?.items && (<ItemView items={Object.entries(weekData?.items ?? {}).find(items => items[0] === day)?.[1]} />)}
                    </>
                )
                }
            </Wrapper>
        </>);
}

export default WeekView;
