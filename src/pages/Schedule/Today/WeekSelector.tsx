import BarChartIcon from '@mui/icons-material/BarChart';
import { Typography, styled } from "@mui/material";
import { ITheme } from "common/App";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { usePlanWeek } from "hooks/usePlan/usePlan";
import { useCallback, useMemo } from "react";
import { Plan } from "types";
import { getCurrentWeek } from "util/dates";
import { ColumnStackFlexBox } from "../../../style/styles";

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
    schedule: Plan;
    onChange: (week: number) => void;
}

export function WeekSelector({ schedule, onChange }: WeekViewProps) {

    const currentWeek = useMemo(() => (!!schedule.weekStarting) ? getCurrentWeek(new Date(schedule.weekStarting)) : 1, [schedule]);
    const [navigatedWeek, setWeek] = useLocalStorage("navigatedWeek", currentWeek);

    const { data: weekData } = usePlanWeek({ WeekNumber: navigatedWeek });

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
                        <GridItemContainer key={idx} onClick={() => handleWeekSet(idx + 1)}>
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
