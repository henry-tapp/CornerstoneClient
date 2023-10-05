import { Item, WeekDay, WeekDayItems, WeekDays } from "types/Item";
import { useScheduleWeek } from "hooks/useSchedule/useSchedule";
import { useCallback, useMemo, useRef, useState } from "react";
import { Typography, styled } from "@mui/material";
import { DayPicker } from "./DayPicker";
import dayjs from 'dayjs';
import { TimeLineView } from "../TimeLineItemView";
import { ITheme } from "common/App";
import 'react-indiana-drag-scroll/dist/style.css';
import { useQueryClient } from "@tanstack/react-query";
import { Queries } from "api";
import { addWeeksToDate, getCurrentWeek } from "util/dates";
import ItemDetails from "../ItemDetails";
import { SwipeableDrawerType, SwipeableEdgeDrawer } from "components/Drawer";
import { ColumnStackFlexBox, GradientBox, Pseudo, RoundedLayer, RoundedLayer2 } from "../styles";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import WeekSelector from "./WeekSelector";
import { Schedule } from "types";

const Wrapper = styled("div")(({ theme }) => `
    max-height: calc(100vh - 3rem);
`);

const Header = styled("div")(({ theme }) => `
    
    padding-left:1rem;
    padding-top:1rem;
    text-align: left;
    justify-content: center;
    gap: 0.25rem;
    padding-bottom: 1.5rem;
`);

const DayPickerWrapper = styled("div")(({ theme }) => `
    max-width:40rem;
    margin:auto;
`);

const Toolbar = styled("div")(({ theme }) => `
    padding-inline: 0.5rem 0.5rem;
    padding-top:1.5rem;
`);

const WeekButton = styled("div")(({ theme }) => `
    display: flex;
    align-items: center;
    text-align:center;
    justify-content: center;
    height:2rem;
    background-color: ${(theme as ITheme).palette.shades.g1};
    color: ${(theme as ITheme).palette.shades.g5};
    border-radius: 1rem;
    margin-left: auto;
    width:8rem;
    position:relative;
    z-index:1; 
    margin-right: 1rem;
`);

const WeekSelectorWrapper = styled("div")(({ theme }) => `
    position:relative;
    border-radius: 0.25rem;
    padding-top:1rem;
    z-index:0;
`);

const ItemWrapper = styled("div")(({ theme }) => `
    grid-column: 2;
    padding:0.5rem;
    padding-top:0;
    position:relative;
    z-index: 1;
    height: 100%;
    overflow-y: scroll;
`);

function findDayItems(weekDayItems: WeekDayItems, weekDay: WeekDay): Item[] | undefined {

    return (Object.entries(weekDayItems)).find(key => key[0] === weekDay)?.[1];
}

export function TodayView(schedule: Schedule) {

    const queryClient = useQueryClient();
    const currentWeek = useMemo(() => (!!schedule.weekStarting) ? getCurrentWeek(new Date(schedule.weekStarting)) : 1, [schedule]);
    
    const [weekSelectorOpenState, setWeekSelectorOpenState] = useState<boolean>(false);
    const [selectedWeek, setSelectedWeek] = useLocalStorage("navigatedWeek", currentWeek);
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
        setSelectedDate(new Date((newWeek === 1) 
            ? schedule.weekStarting 
            : addWeeksToDate(new Date(schedule.weekStarting), newWeek)));
        console.log(selectedDate);
    }, [setSelectedWeek, setSelectedDate, schedule, queryClient]);

    const handleClick = useCallback((newDate: Date) => {
        setSelectedDate(newDate);
    }, []);

    const childRef = useRef<SwipeableDrawerType>(null);
    const handleItemClick = useCallback((itemId: number | undefined) => {
        setSelectedItem(itemId);

        if (!childRef.current?.isOpen) {
            childRef.current?.toggleDrawer();
        }
    }, []);

    const handleClose = useCallback(() => {
        setSelectedItem(undefined);
        childRef.current?.toggleDrawer();
    }, []);

    const handleWeekSelectorToggle = useCallback((toggle: boolean) => {
        setWeekSelectorOpenState(toggle);
    }, []);

    return (weekData?.weekStarting && weekData?.weekEnding && (
        <Wrapper>
            <GradientBox />
            <ColumnStackFlexBox>
            <Header>
                <Typography variant="caption">{dayjs(selectedDate).format('D MMMM, YYYY')}</Typography>
                {selectedDate.getDate() === new Date().getDate() 
                    ? <Typography variant="h1">Today</Typography>
                    : (<Typography variant="h1">{dayjs(selectedDate).format('dddd')}</Typography>)}
            </Header>
            </ColumnStackFlexBox>
            <DayPickerWrapper><DayPicker weekNumber={selectedWeek} setWeek={handleWeekChange} onClick={handleClick} weekStarting={weekData?.weekStarting} weekEnding={weekData?.weekEnding} selectedDate={selectedDate} /></DayPickerWrapper>
            <RoundedLayer/>
            <RoundedLayer2/>
            <Pseudo />
            <Toolbar>
                <WeekButton onClick={() => handleWeekSelectorToggle(!weekSelectorOpenState)}>
                    <Typography variant="caption">Week {selectedWeek} </Typography>
                </WeekButton>
                {!!weekSelectorOpenState && (
                    <WeekSelectorWrapper>
                        <WeekSelector schedule={schedule} onChange={handleWeekChange} /> 
                    </WeekSelectorWrapper>
                )}
            </Toolbar>
            <ItemWrapper>{currentDayItems && 
                <TimeLineView items={currentDayItems} handleSelectedItem={handleItemClick} />}
            </ItemWrapper>
            <SwipeableEdgeDrawer onClose={handleClose} ref={childRef}>
                <div>
                    {selectedItem && (<ItemDetails onBack={handleClose} itemId={selectedItem} />)}
                </div>
            </SwipeableEdgeDrawer>
        </Wrapper>));
}

export default TodayView; 