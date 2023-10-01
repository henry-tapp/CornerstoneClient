import { Item, WeekDay, WeekDayItems, WeekDays } from "types/Item";
import { useScheduleWeek } from "hooks/useSchedule/useSchedule";
import { MutableRefObject, useCallback, useMemo, useRef, useState } from "react";
import { ViewProps } from "../index.types";
import { SwipeableDrawerProps, Typography, styled } from "@mui/material";
import { DayPicker } from "./DayPicker";
import dayjs from 'dayjs';
import { TimeLineView } from "../TimeLineItemView";
import { ITheme } from "common/App";
import 'react-indiana-drag-scroll/dist/style.css';
import { useQueryClient } from "@tanstack/react-query";
import { Queries } from "api";
import duration from 'dayjs/plugin/duration';
import { addWeeksToDate } from "util/dates";
import ItemDetails from "../ItemDetails";
import { SwipeableDrawerType, SwipeableEdgeDrawer } from "components/Drawer";

const Header = styled("div")(({ theme }) => `
    grid-column: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding-left:1rem;
    padding-top:1rem;
    text-align: left;
    justify-content: center;
    width: 10rem;
    gap: 0.25rem;
    padding-bottom: 1.5rem;
`);

const ItemWrapper = styled("div")(({ theme }) => `
    grid-column: 2;
`);

const GradientBox = styled("div")(({ theme }) => `
    position:absolute;
    opacity: 0.2;
    height:8rem;
    width:100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(${(theme as ITheme).palette.secondary.light}, ${(theme as ITheme).palette.primary.dark});
`);

const Grid = styled("div")(({ theme }) => `
    display: grid;
    grid-template-columns: 2fr 5fr;
`);


function findDayItems(weekDayItems: WeekDayItems, weekDay: WeekDay): Item[] | undefined {

    return (Object.entries(weekDayItems)).find(key => key[0] === weekDay)?.[1];
}

function getCurrentWeek(startingWeek: Date): number {
    dayjs.extend(duration);
    return Math.floor(dayjs.duration(dayjs().diff(dayjs(startingWeek))).asWeeks());
}

export function TodayView({ schedule }: ViewProps) {

    const queryClient = useQueryClient();

    const currentWeek = useMemo(() => (!!schedule.weekStarting) ? getCurrentWeek(new Date(schedule.weekStarting)) : 1, [schedule]);
    const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedItem, setSelectedItem] = useState<number | undefined>();
    const { data: weekData } = useScheduleWeek({ WeekNumber: selectedWeek });
    const currentDayItems = useMemo(() => {
        let dayIndex = selectedDate.getDay();
        return weekData?.items && findDayItems(weekData?.items, WeekDays[(dayIndex - 1 === -1) ? 6 : dayIndex - 1]);
    }, [selectedDate, weekData]);


    const handleWeekChange = useCallback((newWeek: number) => {
        setSelectedWeek(newWeek);
        queryClient.invalidateQueries(Queries.getScheduleWeek(newWeek));
        setSelectedDate(addWeeksToDate(new Date(schedule.weekStarting), newWeek));
    }, [setSelectedWeek, setSelectedDate, schedule, queryClient]);

    const handleClick = useCallback((newDate: Date) => {
        setSelectedDate(newDate);
    }, []);

    const childRef = useRef<SwipeableDrawerType>(null);
    const handleItemClick = useCallback((itemId: number | undefined) => {
        setSelectedItem(itemId);

        if (!childRef.current?.isOpen) {
            childRef.current?.toggleDrawer()
        }
    }, []);

    const handleClose = useCallback(() => {
        setSelectedItem(undefined);
    }, []);

    return (weekData?.weekStarting && weekData?.weekEnding && (
        <>
            <GradientBox />
            <Grid>
                <Header>
                    <Typography variant="subtitle1">{dayjs(selectedDate).format('DD MMMM, YYYY')}</Typography>
                    {selectedDate.getDate() === new Date().getDate() ? <Typography variant="h1">Today</Typography>
                        : (selectedDate > new Date() && (<Typography variant="h1">Schedule</Typography>))
                        || (selectedDate < new Date() && (<Typography variant="h1">Progress</Typography>))}
                </Header>
            </Grid>
            <DayPicker weekNumber={selectedWeek} setWeek={handleWeekChange} onClick={handleClick} weekStarting={weekData?.weekStarting} weekEnding={weekData?.weekEnding} selectedDate={selectedDate} />
            <ItemWrapper>{currentDayItems && <TimeLineView items={currentDayItems} handleSelectedItem={handleItemClick} />}</ItemWrapper>
            <SwipeableEdgeDrawer onClose={handleClose} ref={childRef}>
                <div>
                    {selectedItem && (<ItemDetails itemId={selectedItem} />)}
                </div>
            </SwipeableEdgeDrawer>
        </ >));
}

export default TodayView; 