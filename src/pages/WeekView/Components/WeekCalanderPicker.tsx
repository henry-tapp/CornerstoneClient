import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, PickersCalendarHeader } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader/PickersCalendarHeader.types';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { ITheme } from 'common/App';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import updateLocale from 'dayjs/plugin/updateLocale';
import * as React from 'react';
import { useCallback } from 'react';
import { Plan } from 'types';
import { getCurrentWeek as getWeekNumber } from 'util/dates';

dayjs.Ls.en.weekStart = 1;
dayjs.extend(isBetweenPlugin);
dayjs.extend(updateLocale);

const CustomWeekPickerHeader = styled(PickersCalendarHeader)<PickersCalendarHeaderProps<Dayjs>>(({ theme }) => ({
    color: (theme as ITheme).palette.primary.dark
})) as React.ComponentType<PickersCalendarHeaderProps<Dayjs>>;

function Header(props: PickersCalendarHeaderProps<Dayjs>) {

    return (
        <CustomWeekPickerHeader {...props} />
    );
}

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    isSelected: boolean;
    isHovered: boolean;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day, today }) => ({
    borderRadius: 0,
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
    ...(isHovered && {
        backgroundColor: theme.palette.primary[theme.palette.mode],
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary[theme.palette.mode],
        },
    }),
    ...(day.day() === 1 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 0 && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {

    if (dayB == null) {
        return false;
    }

    return dayA.isSame(dayB, 'week');
};

function Day(
    props: PickersDayProps<Dayjs> & {
        selectedDay?: Dayjs | null;
        hoveredDay?: Dayjs | null;
    },
) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.5 }}
            disableMargin
            selected={false}
            disableHighlightToday
            isSelected={isInSameWeek(day, selectedDay)}
            isHovered={isInSameWeek(day, hoveredDay)}
        />
    );
}


export interface WeekPickerProps {
    currentWeek: number;
    schedule: Plan;
    setWeek: (week: number) => void;
}

export default function WeekPicker({ currentWeek, schedule, setWeek }: WeekPickerProps) {

    const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(null);
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

    const handleChange = useCallback((newDate: Dayjs | null) => {
        if (newDate !== null) {
            setValue(newDate);
            var newWeek = getWeekNumber(newDate.toDate());
            if (newWeek !== currentWeek) {
                setWeek(newWeek);
            }
        }
    }, [currentWeek, setWeek, setValue]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={value}
                minDate={dayjs(schedule.dateStarting)}
                maxDate={dayjs(schedule.dateEnding).subtract(1)}
                onChange={handleChange}
                showDaysOutsideCurrentMonth
                reduceAnimations
                displayWeekNumber
                slots={{ day: Day, calendarHeader: Header }}
                slotProps={{
                    day: (ownerState) =>
                    ({
                        selectedDay: value,
                        hoveredDay,
                        onPointerEnter: () => setHoveredDay(ownerState.day),
                        onPointerLeave: () => setHoveredDay(null),
                    } as any),
                }}
            />
        </LocalizationProvider>
    );
}


