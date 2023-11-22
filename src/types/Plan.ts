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
    selectedFocus: FocusType;
}

export interface PlanCreationData {
    plan: PlanOptions;
    userMeasurements: UserMeasurements;
    userPreferences: UserPreferences;
}

export enum PlanType {

    "SportClimbing" = 1,
    "Bouldering" = 2
}

export enum FocusType {

    AllRound = 0,
    Flexibility = 1,
    FingerStrength = 2,
    Power = 3,
    Endurance = 4
}