import { WorkoutType, WorkoutVariation } from "./Workout";

export interface Item {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    variation: WorkoutVariation;
    exercises?: number;
    estimatedCompletionMinutes?: number;
    state: ItemState
}

export type ItemState = "todo" | "partial" | "complete";

export interface WeekItemView {

    id: string;
    weekId: string;
    name: string;
    description: string;
    scheduled: boolean;
    completed: boolean;
    scheduledDayOfWeek: ScheduledDay;
    estimatedCompletionMinutes?: number;
    equipment: WorkoutEquipment;
    phaseType: PhaseType;
    focus: WorkoutType;
}

export interface ItemType {
    id: string;
    name: string;
}

export enum ScheduledDay {

    None = -1,
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export enum WorkoutEquipment {
    ClimbingWall = 0,
    Gym = 1,
    Hangboard = 2,
    Yoga = 3,
    Weights = 4,
    TRX = 5,
    Outdoor = 6
}

export enum PhaseType {
    ExerciseVariantSpecific = 1,
    Build = 2,
    Strength = 3,
    Endurance = 4,
    Any = 5
}