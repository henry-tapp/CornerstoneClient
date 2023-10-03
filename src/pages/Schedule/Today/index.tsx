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


const Grid = styled("div")(({ theme }) => `
    display: grid;
    grid-template-columns: 2fr 5fr;
`);

const Column1 = styled("div")(({ theme }) => `
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

const Column2 = styled("div")(({ theme }) => `
    margin: auto;
    text-align: center;
    grid-column: 2;
    width: 8rem;
    background-color: ${(theme as ITheme).palette.shades.g6};
    color: ${(theme as ITheme).palette.shades.g0};
    border-radius:1rem;
`);

const ItemWrapper = styled("div")(({ theme }) => `
    grid-column: 2;
`);


const RoundedLayer = styled("div")(({ theme }) => `
    background-color: ${(theme as ITheme).palette.shades.g6};
    border-radius: 3rem 0 0 0;
    height:100vh;
    width: 100%;
    position:absolute;
    top: 12rem; 
`); 


const RoundedLayer2 = styled("div")(({ theme }) => `
    background-color: ${(theme as ITheme).palette.shades.g6};
    border-radius: 1rem 3rem 0 1rem;
    height:50vh;
    width:5rem;
    position:absolute;
    top: 3rem;
    right: -4rem;
`); 

const Pseudo = styled("div")(({ theme }) => `
    background-color: transparent;
    border-radius: 0 0 3rem 0;
    height:5rem;
    width:5rem;
    position:absolute;
    top: 7rem;
    right: 1rem;
    box-shadow:  1rem 1rem 0  0 ${(theme as ITheme).palette.shades.g6};
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


const DateWrapper = styled("div")(({ theme }) => `
  margin: auto;
  text-align: left;
  padding-left:2rem;
  padding-top:3rem;
  width:100%;
  color: ${(theme as ITheme).palette.shades.g1};
  position:relative;
  z-index:3;
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
                <Column1>
                <Typography variant="caption">{dayjs(selectedDate).format('DD MMMM, YYYY')}</Typography>
             
                    {selectedDate.getDate() === new Date().getDate() ? <Typography variant="h1">Today</Typography>
                        : (selectedDate > new Date() && (<Typography variant="h1">Schedule</Typography>))
                        || (selectedDate < new Date() && (<Typography variant="h1">Progress</Typography>))}
                        
                </Column1>
                <Column2><Typography variant="caption">Week {selectedWeek}</Typography></Column2>
            </Grid>
            <DayPicker weekNumber={selectedWeek} setWeek={handleWeekChange} onClick={handleClick} weekStarting={weekData?.weekStarting} weekEnding={weekData?.weekEnding} selectedDate={selectedDate} />
           
            <DateWrapper>
                <Typography variant="h1">{dayjs(selectedDate).format('dddd')}</Typography>
            </DateWrapper>
            <RoundedLayer/>
            <RoundedLayer2/>
            <Pseudo />
            <div style={{zIndex:1, paddingTop: "3rem", padding: '0.5rem'}}><ItemWrapper>{currentDayItems && <TimeLineView items={currentDayItems} handleSelectedItem={handleItemClick} />}</ItemWrapper></div>
            <SwipeableEdgeDrawer onClose={handleClose} ref={childRef}>
                <div>
                    {selectedItem && (<ItemDetails itemId={selectedItem} />)}
                </div>
            </SwipeableEdgeDrawer>
        </ >));
}

export default TodayView; 