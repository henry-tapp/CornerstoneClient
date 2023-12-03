import { PhaseType, ScheduledDay } from "types";

export interface ScheduleWeekView {

    id: string;
    planId: string;
    weekStarting: Date;
    weekEnding: Date;
    weekNumber: number;
    isPeakWeek: boolean;
    phase: PhaseType;
}

export interface WeekItem {

    id: string;
    weekId: string;
    itemGroupId: string;
    name: string;
    description: string;
    weekNumber: number;
    scheduled: boolean;
    completed: boolean;
    estimatedCompletionMinutes: number;
    scheduledDayOfWeek: ScheduledDay;
    type: WorkoutGroupType;
    workouts: WeekItemWorkout[];
}

export interface WeekItemWorkout {
    id: string;
    weekItemId: string;
    workoutId: string; // routineid or activityid
    completed: boolean;
    name: string;
    description: string;
    summary: string;
    itemType: ItemType;
    activityType: ActivityType;
    routineType: RoutineType;
    step: number;
    instructions?: string;
    estimatedCompletionMinutes: number;
}

export enum WorkoutGroupType {
    Yoga = 1,
    Gym = 2,
    Hangboard = 3,
    Climbing = 4
}

export enum ActivityType {
    Open = 0,
    Fingerboard = 1,
    Strength = 2,
    PowerEndurance = 3,
    AerobicBase = 4,
    Conditioning = 5,
    Stretching = 6,
    CrossTraining = 7,
}

export enum RoutineType {

    Warmup = 1,
    Cooldown = 2,
    Hangboard = 3,
    Climbing = 4,
    Gym = 5
}

export enum ItemType {

    Routine = 1,
    Activity = 2,
}