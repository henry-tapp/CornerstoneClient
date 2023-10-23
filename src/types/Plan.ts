import { WeekDayItems } from "./Item";
import { UserMeasurements } from "./UserMeasurements";

export interface Plan {
    weekStarting: Date;
    dateEnding: Date;
    numberOfWeeks: number;
    peakWeek: number;
}

export interface PlanCreationData {
    plan: Omit<Plan, "dateEnding | numberOfWeeks | peakWeek">;
    userMeasurements: UserMeasurements;
}

export interface PlanWeek extends Omit<Plan, "numberOfWeeks" | "peakWeek"> {
    id: string;
    weekStarting: Date;
    weekNumber: number;
    weekEnding: Date;
    items?: WeekDayItems;
    peakWeek: boolean;
}