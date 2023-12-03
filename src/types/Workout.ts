import { Exercise } from "./Exercise";
import { ActivityType, ItemType, RoutineType } from "./Schedule";

export interface ScheduledActivity {
    itemType: ItemType;
    activityId: string;
    itemGroupLinkId: string;
    estimatedCompletionMinutes: number;
    exercise: Exercise;
    workoutType: ActivityType;
    completed: boolean;
}

export interface ScheduledRoutine {
    itemType: ItemType;
    routineId: string;
    itemGroupLinkId: string;
    estimatedCompletionMinutes: number;
    workoutType: RoutineType;
    completed: boolean;
    activities: RoutineActivities;
}

export interface RoutineActivities {
    itemType: ItemType;
    activityId: string;
    routineId: string;
    estimatedCompletionMinutes: number;
    exercise: Exercise;
    workoutType: ActivityType;
    completed: boolean;
    routineStep: number;
}

export interface ScheduledWorkout {

    itemType: ItemType;
    activityId: string;
    routineId: string;
    itemGroupLinkId: string;
    estimatedCompletionMinutes: number;
    exercise: Exercise;
    workoutType: number;
    completed: boolean;
    activities: RoutineActivities;
}