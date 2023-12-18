import { ScheduledDay } from "./Item";

export type WeekDay = typeof days[number];

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const daysShort = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
export const WeekDays = days as WeekDay[];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const UNSCHEDULED: string = "Unscheduled";

export const scheduleLists = [UNSCHEDULED].concat(days);
export const scheduledDayOfWeekMapper = scheduleLists.map((x, i) => {
    return {
        enum: x === UNSCHEDULED ? ScheduledDay.None : ScheduledDay[x] as ScheduledDay,
        scheduleListIndex: i,
        title: x
    }
});