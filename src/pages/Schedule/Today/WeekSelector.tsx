import BarChartIcon from '@mui/icons-material/BarChart';
import { Typography, styled } from "@mui/material";
import { ITheme } from "common/App";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { useCallback, useMemo } from "react";
import { Plan } from 'types';
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

export function WeekSelector({ schedule: plan, onChange }: WeekViewProps) {

    const currentWeek = useMemo(() => (!!plan.dateStarting) ? getCurrentWeek(new Date(plan.dateStarting)) : 1, [plan]);
    const [_, setWeek] = useLocalStorage("navigatedWeek", currentWeek);

    const handleWeekSet = useCallback((newWeek: number) => {
        setWeek(newWeek);
        console.log(newWeek);
        onChange(newWeek);

    }, [setWeek, onChange]);

    return (
        <>
            <Wrapper>
                <StyledGrid>
                    {Array.from(Array(plan.numberOfWeeks)).map((week, idx) =>
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
