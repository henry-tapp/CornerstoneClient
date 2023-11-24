import ScheduleIcon from '@mui/icons-material/Schedule';
import { IconButton, Typography, styled } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Queries } from "api";
import { ITheme } from "common/App";
import { SwipeableDrawerType, SwipeableEdgeDrawer } from "components/Drawer";
import { LinkPersistQuery } from "components/LinkPersistQuery";
import dayjs from 'dayjs';
import { useLocalStorage } from 'hooks/useLocalStorage/useLocalStorage';
import { useWeekItems } from 'hooks/useWeekItems/useWeekItems';
import WorkoutContextProvider from 'pages/Schedule/Context/WorkoutDrawerContextProvider';
import { useCallback, useMemo, useRef, useState } from "react";
import 'react-indiana-drag-scroll/dist/style.css';
import { Plan, ScheduleWeekView, WeekItemWorkout } from 'types';
import { addWeeksToDate, getCurrentWeek } from "util/dates";
import { ColumnStackFlexBox, GradientBox, Pseudo, RoundedLayer, RoundedLayer2 } from "../../style/styles";
import { DayItemList } from './Components/DayItemList';
import { DayPicker } from "./Components/DayPicker";
import WeekSelector from "./Components/WeekSelector";
import WorkoutDetails from "./WorkoutDetails";

const Wrapper = styled("div")(({ theme }) => `
    position: relative;
    background-color: ${(theme as ITheme).palette.shades.g6};
    min-height: 100vh;
    z-index: 100;
`);


const Header = styled("div")(({ theme }) => `
    padding-left:1rem;
    padding-top:1rem;
    text-align: left;
    justify-content: center;
    gap: 0.25rem;
    padding-bottom: 1.5rem;
    z-index: 200;
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

const ItemListWrapper = styled("div")(({ theme }) => `
    grid-column: 2;
    position:relative;
    z-index: 3;
    height: 100%;
    padding-bottom: 3rem;
`);

export interface TodayViewProps {

    plan: Plan;
    scheduleWeeks?: ScheduleWeekView[];
}

export function TodayView({ plan, scheduleWeeks }: TodayViewProps) {

    const queryClient = useQueryClient();
    const [weekSelectorOpenState, setWeekSelectorOpenState] = useState<boolean>(false);

    const currentWeek = useMemo(() => (!!plan.dateStarting) ? getCurrentWeek(new Date(plan.dateStarting)) : 1, [plan.dateStarting]);

    const [navigatedWeek, setNavigatedWeek] = useLocalStorage("navigatedWeek", currentWeek);

    const [selectedWeek, setSelectedWeek] = useState<ScheduleWeekView | undefined>(scheduleWeeks?.find(x => x.weekNumber === navigatedWeek));
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedWorkout, setSelectedWorkout] = useState<WeekItemWorkout | undefined>(undefined);

    const { data: weekItems } = useWeekItems({ weekId: selectedWeek?.id });

    const currentDayItems = useMemo(() => {
        let dayIndex = selectedDate.getDay();
        return weekItems && weekItems.filter(x => x.scheduledDayOfWeek === dayIndex);
    }, [selectedDate, weekItems]);

    const handleWeekChange = useCallback((newWeek: number) => {
        const week = scheduleWeeks?.find(x => x.weekNumber === newWeek);
        setNavigatedWeek(week?.weekNumber);
        setSelectedWeek(week);
        queryClient.invalidateQueries(Queries.getWeekItems(week?.id));
        setSelectedDate(new Date((newWeek === 1)
            ? plan?.dateStarting
            : addWeeksToDate(new Date(plan?.dateStarting), newWeek)));
    }, [setNavigatedWeek, setSelectedWeek, setSelectedDate, plan, scheduleWeeks, queryClient]);

    const workoutDrawerRef = useRef<SwipeableDrawerType>(null);

    const handleClose = useCallback(() => {
        setSelectedWorkout(undefined);
        workoutDrawerRef.current?.toggleDrawer();
    }, []);

    const handleWeekSelectorToggle = useCallback((toggle: boolean) => {
        setWeekSelectorOpenState(toggle);
    }, []);

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
                <ToolbarButton style={{ width: "2rem" }}>
                    <LinkPersistQuery pathname={`/manage`}>
                        <IconButton><ScheduleIcon style={{ color: "white" }} /></IconButton>
                    </LinkPersistQuery>
                </ToolbarButton>
                <ToolbarButton style={{ width: "7rem", marginRight: "1rem" }} onClick={() => handleWeekSelectorToggle(!weekSelectorOpenState)}>
                    <Typography variant="button">Week {selectedWeek.weekNumber} </Typography>
                </ToolbarButton>
            </Toolbar>
            {!!weekSelectorOpenState && (
                <WeekSelectorWrapper>
                    <WeekSelector schedule={plan} onChange={handleWeekChange} />
                </WeekSelectorWrapper>
            )}
            <WorkoutContextProvider workoutDrawerRef={workoutDrawerRef} setSelectedWorkout={setSelectedWorkout}>
                <ItemListWrapper>
                    {currentDayItems && <DayItemList items={currentDayItems} />}
                </ItemListWrapper>
                <SwipeableEdgeDrawer onClose={handleClose} ref={workoutDrawerRef}>
                    <div>{selectedWorkout && (<WorkoutDetails onBack={handleClose} workout={selectedWorkout} />)}</div>
                </SwipeableEdgeDrawer>
            </WorkoutContextProvider>
        </Wrapper>));
}

export default TodayView; 