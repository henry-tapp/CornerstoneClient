import ScheduleIcon from '@mui/icons-material/Schedule';
import { IconButton, Typography, styled, useTheme } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Queries } from "api";
import { ITheme } from "common/App";
import { LinkPersistQuery } from "components/LinkPersistQuery";
import dayjs from 'dayjs';
import { useLocalStorage } from 'hooks/useLocalStorage/useLocalStorage';
import { useWeekItems } from 'hooks/useWeekItems/useWeekItems';
import { useCallback, useMemo, useState } from "react";
import 'react-indiana-drag-scroll/dist/style.css';
import { Plan, ScheduleWeekView } from 'types';
import { getCurrentWeek } from "util/dates";
import { ColumnStackFlexBox, GradientBox, Pseudo, RoundedLayer, RoundedLayer2, Wrapper } from "../../style/styles";
import { DayItemList } from './Components/DayItemList';
import { DayPicker } from "./Components/DayPicker";
import WeekPicker from './Components/WeekCalanderPicker';

const Header = styled("div")(({ theme }) => `
    padding-left:1rem;
    padding-top:1rem;
    text-align: left;
    justify-content: center;
    gap: 0.25rem;
    padding-bottom: 1.5rem;
    z-index: 2;
`);

const DayPickerWrapper = styled("div")(({ theme }) => `
    max-width:40rem;
    margin:auto;
`);

const Toolbar = styled("div")(({ theme }) => `
    padding-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`);

const ScheduleButton = styled("div")(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 3;
    height:2rem;
    width: 2rem;
    background-color: ${(theme as ITheme).palette.shades.g1};
    color: ${(theme as ITheme).palette.shades.g5};
    border-radius: 1rem;
    position:relative;
    z-index:3; 
`);

const WeekSelectorButton = styled("div")(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 2;
    place-self: center;
    height:2rem;
    width: 12rem;
    background-color: ${(theme as ITheme).palette.primary.main};
    color: ${(theme as ITheme).palette.shades.g6};
    border-radius: 1rem;
    position: relative;
    z-index:3; 
`);

const WeekSelectorWrapper = styled("div")(({ theme }) => `
    position:relative;
    border-radius: 0.25rem;
    padding-top:1rem;
    z-index:3;
`);

const ItemListWrapper = styled("div")(({ theme }) => `
    position:relative;
    z-index: 3;
    height: 100%;
    padding-bottom: 4rem;
`);

export interface WeekViewProps {

    plan: Plan;
    scheduleWeeks: ScheduleWeekView[];
}

export function WeekView({ plan, scheduleWeeks }: WeekViewProps) {

    const theme = useTheme();
    const queryClient = useQueryClient();
    const [weekSelectorOpenState, setWeekSelectorOpenState] = useState<boolean>(false);

    const currentWeek = useMemo(() => (!!plan.dateStarting) ? getCurrentWeek(new Date(plan.dateStarting)) : 1, [plan.dateStarting]);

    const [navigatedWeek, setNavigatedWeek] = useLocalStorage("navigatedWeek", currentWeek);

    const selectedWeek = useMemo(() => scheduleWeeks.find(x => x.weekNumber === navigatedWeek) ?? scheduleWeeks[0], [navigatedWeek, scheduleWeeks]);

    const [selectedDate, setSelectedDate] = useState<Date>(navigatedWeek === currentWeek ? new Date() : new Date(selectedWeek.weekStarting) ?? new Date());

    const { data: weekItems } = useWeekItems({ weekId: selectedWeek?.id });

    const currentDayItems = useMemo(() => {
        let dayIndex = selectedDate.getDay();
        return weekItems && weekItems.filter(x => x.scheduledDayOfWeek === dayIndex);
    }, [selectedDate, weekItems]);

    const handleWeekChange = useCallback((newWeek: number) => {
        const week = scheduleWeeks?.find(x => x.weekNumber === newWeek);
        if (!week) throw new Error("This calander week is not included in the current plan.");
        setNavigatedWeek(week?.weekNumber);
        queryClient.invalidateQueries(Queries.getWeekItems(week?.id));
        setSelectedDate(new Date(week?.weekStarting));
        setWeekSelectorOpenState(false);
    }, [setNavigatedWeek, setSelectedDate, setWeekSelectorOpenState, scheduleWeeks, queryClient]);

    return (selectedWeek?.weekStarting && selectedWeek?.weekStarting && (
        <Wrapper className='wrapper'>
            <GradientBox />
            <ColumnStackFlexBox>
                <Header>
                    <Typography variant="caption">{dayjs(selectedDate).format('D MMMM, YYYY')}</Typography>
                    <Typography variant="h3">{selectedDate.getDate() === new Date().getDate() ? "Today" : dayjs(selectedDate).format('dddd')}</Typography>
                </Header>
            </ColumnStackFlexBox>
            <DayPickerWrapper><DayPicker scheduleWeek={selectedWeek} onClick={setSelectedDate} selectedDate={selectedDate} /></DayPickerWrapper>
            <RoundedLayer className='roundLayer' />
            <RoundedLayer2 className='roundLayer2' />
            <Pseudo className='pseudo' />
            <Toolbar>
                <WeekSelectorButton onClick={() => setWeekSelectorOpenState(!weekSelectorOpenState)}>
                    <Typography variant="button">Week {selectedWeek.weekNumber} </Typography>
                </WeekSelectorButton>
                <ScheduleButton style={{ width: "2rem" }}>
                    <LinkPersistQuery pathname={`/schedule`}>
                        <IconButton style={{ backgroundColor: (theme as ITheme).palette.primary.main, color: "white" }}><ScheduleIcon fontSize='small' /></IconButton>
                    </LinkPersistQuery>
                </ScheduleButton>
            </Toolbar>
            {!!weekSelectorOpenState && (
                <WeekSelectorWrapper>
                    <WeekPicker currentWeek={selectedWeek.weekNumber} schedule={plan} setWeek={handleWeekChange} />
                </WeekSelectorWrapper>
            )}
            <ItemListWrapper className="item-list">
                {currentDayItems && <DayItemList items={currentDayItems} />}
            </ItemListWrapper>
        </Wrapper>)
    );
}

export default WeekView; 