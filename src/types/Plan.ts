import { PhaseType, WeekItemView } from "./Item";
import { UserMeasurements, UserPreferences } from "./User";

export interface Plan extends PlanOptions {
    id: string;
    numberOfWeeks: number;
}

export interface PlanOptions {
    dateStarting: Date;
    peakWeekDateStarting: Date;
    availableWeeklyOutdoorClimbDays: number;
    planType: PlanType;
}

export interface PlanCreationData {
    plan: PlanOptions;
    userMeasurements: UserMeasurements;
    userPreferences: UserPreferences;
}

export interface Schedule {
    plan: Plan;
    weeks?: ScheduleWeekView[];
}

export interface ScheduleWeekView {

    id: string;
    planId: string;
    weekStarting: Date;
    weekEnding: Date;
    weekNumber: number;
    isPeakWeek: boolean;
    phase: PhaseType;
    weekItems: WeekItemView[];
}

export enum PlanType {

    "SportClimbing" = 1,
    "Bouldering" = 2
}