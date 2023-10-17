import { Item, WeekDay, WeekDayItems, WeekDays } from "types";
import { useScheduleWeek } from "hooks/useSchedule/useSchedule";
import { useCallback, useMemo, useRef, useState } from "react";
import { IconButton, Typography, styled } from "@mui/material";
import { DayPicker } from "./DayPicker";
import { TimeLineView } from "../TimeLineItemView";
import { ITheme } from "common/App";
import { useQueryClient } from "@tanstack/react-query";
import { Queries } from "api";
import { addWeeksToDate, getCurrentWeek } from "util/dates";
import ItemDetails from "../ItemDetails";
import { SwipeableDrawerType, SwipeableEdgeDrawer } from "components/Drawer";
import { ColumnStackFlexBox, GradientBox, Pseudo, RoundedLayer, RoundedLayer2 } from "../../../style/styles";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { Schedule } from "types";
import dayjs from 'dayjs';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WeekSelector from "./WeekSelector";
import 'react-indiana-drag-scroll/dist/style.css';
import { LinkPersistQuery } from "components/LinkPersistQuery";


const Wrapper = styled("div")(({ theme }) => `
    max-height: calc(100vh - 2rem);
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
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
    gap: 0.5rem;

`);

const ToolbarButton = styled("div")(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    height:2rem;
    background-color: ${(theme as ITheme).palette.shades.g1};
    color: ${(theme as ITheme).palette.shades.g5};
    border-radius: 1rem;
    position:relative;
    z-index:3; 
`);

const WeekSelectorWrapper = styled("div")(({ theme }) => `
    position:relative;
    border-radius: 0.25rem;
    padding-top:1rem;
    z-index:3;
`);

const ItemWrapper = styled("div")(({ theme }) => `
    grid-column: 2;
    padding:0.5rem;
    padding-top:0;
    position:relative;
    z-index: 3;
    height: 100%;
    padding-bottom: 3rem;
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

    const [selectedItem, setSelectedItem] = useState<string | undefined>();
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
    }, [setSelectedWeek, selectedDate, setSelectedDate, schedule, queryClient]);

    const handleClick = useCallback((newDate: Date) => {
        setSelectedDate(newDate);
    }, []);

    const childRef = useRef<SwipeableDrawerType>(null);
    const handleItemClick = useCallback((itemId: string | undefined) => {
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
            <RoundedLayer />
            <RoundedLayer2 />
            <Pseudo />
            <Toolbar>
                <ToolbarButton style={{ width: "2rem" }}>
                    <LinkPersistQuery pathname={`/manage/${selectedWeek}`}>
                        <IconButton><ScheduleIcon style={{ color: "white" }} /></IconButton>
                    </LinkPersistQuery>
                </ToolbarButton>
                <ToolbarButton style={{ width: "7rem", marginRight: "1rem" }} onClick={() => handleWeekSelectorToggle(!weekSelectorOpenState)}>
                    <Typography variant="caption">Week {selectedWeek} </Typography>
                </ToolbarButton>

            </Toolbar>
            {!!weekSelectorOpenState && (
                <WeekSelectorWrapper>
                    <WeekSelector schedule={schedule} onChange={handleWeekChange} />
                </WeekSelectorWrapper>
            )}
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