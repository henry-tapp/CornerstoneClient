import { WeekDayItems } from "./Item";

export interface Schedule {
    weekStarting: Date;
    dateEnding: Date;
    numberOfWeeks: number;
    peakWeek: number;
}

export interface ScheduleWeek extends Omit<Schedule, "numberOfWeeks" | "peakWeek"> {
    weekNumber: number;
    weekStarting: Date;
    weekEnding: Date;
    items?: WeekDayItems;
    peakWeek: boolean;
}