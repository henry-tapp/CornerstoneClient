import { ScheduledDay } from "./Item";

export type WeekDay = typeof days[number];

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const daysShort = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
export const WeekDays = days as WeekDay[];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const UNSCHEDULED: string = "Unscheduled";

export const scheduleLists = [UNSCHEDULED].concat(days);
export const scheduledDayOfWeekMapper = [
    {
        enum: ScheduledDay.None,
        scheduleListIndex: 0
    },
    {
        enum: ScheduledDay.Monday,
        scheduleListIndex: 1
    },
    {
        enum: ScheduledDay.Tuesday,
        scheduleListIndex: 2
    },
    {
        enum: ScheduledDay.Wednesday,
        scheduleListIndex: 3
    },
    {
        enum: ScheduledDay.Thursday,
        scheduleListIndex: 4
    },
    {
        enum: ScheduledDay.Friday,
        scheduleListIndex: 5
    },
    {
        enum: ScheduledDay.Saturday,
        scheduleListIndex: 6
    },
    {
        enum: ScheduledDay.Sunday,
        scheduleListIndex: 7
    }
]