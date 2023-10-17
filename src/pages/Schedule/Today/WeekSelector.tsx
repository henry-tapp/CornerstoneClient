import { days } from "types/Item";
import { useCallback, useMemo } from "react";
import { WeeklyNavigation } from "pages/Navigation/WeeklyNavigation";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { useScheduleWeek } from "hooks/useSchedule/useSchedule";
import { Typography, styled } from "@mui/material";
import { ITheme } from "common/App";
import { ColumnStackFlexBox } from "../../../style/styles";
import BarChartIcon from '@mui/icons-material/BarChart';
import { Schedule } from "types";
import { getCurrentWeek } from "util/dates";

const Wrapper = styled("div")(
    ({ theme }) => `
`
);

const StyledGrid = styled("div")(({ theme }) => `
    display: grid;
    justify-items: start;
    grid-template-columns: repeat(6, 1fr);
    text-align: center;
    grid-gap: 0.25rem;
    vertical-align: middle;
`);


const GridItemContainer = styled("div")(({ theme }) => `
  width: 100%;
  height:2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius:1rem;
  color: ${(theme as ITheme).palette.shades.g1};
  height:4rem;
`);


export interface WeekViewProps {
    schedule: Schedule;
    onChange: (week: number) => void;
}

export function WeekSelector({ schedule, onChange }: WeekViewProps) {

    const currentWeek = useMemo(() => (!!schedule.weekStarting) ? getCurrentWeek(new Date(schedule.weekStarting)) : 1, [schedule]);
    const [navigatedWeek, setWeek] = useLocalStorage("navigatedWeek", currentWeek);

    const { data: weekData } = useScheduleWeek({ WeekNumber: navigatedWeek });

    const handleWeekSet = useCallback((newWeek: number) => {
        setWeek(newWeek);
        console.log(newWeek);
        onChange(newWeek);

    }, [setWeek]);

    return (
        <>
            <Wrapper>
                <StyledGrid>
                {Array.from(Array(schedule.numberOfWeeks)).map((week, idx) =>
                    <GridItemContainer key={idx} onClick={() => handleWeekSet(idx+1)}>
                        <ColumnStackFlexBox>
                            <Typography variant="caption">{idx + 1}</Typography>
                            <BarChartIcon />
                        </ColumnStackFlexBox>
                    </GridItemContainer>
                )}
                </StyledGrid>
            </Wrapper>
        </>);
}

export default WeekSelector;
