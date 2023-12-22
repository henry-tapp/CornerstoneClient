import { Exercise } from "./Exercise";
import { ActivityType, ItemType, RoutineType } from "./Schedule";

export interface ScheduledActivity {
    name: string;
    description: string;
    summary: string;
    instructions: string;
    itemType: ItemType;
    activityId: string;
    itemGroupLinkId: string;
    estimatedCompletionSeconds: number;
    exercise: Exercise;
    workoutType: ActivityType;
    completed: boolean;
}

export interface ScheduledRoutine {
    name: string;
    description: string;
    summary: string;
    itemType: ItemType;
    routineId: string;
    itemGroupLinkId: string;
    estimatedCompletionSeconds: number;
    workoutType: RoutineType;
    completed: boolean;
    activities: RoutineActivity[];
}

export interface RoutineActivity extends ScheduledActivity {
    routineStep: number;
}

export interface ScheduledWorkout {

    weekItemWorkoutId: string;
    name: string;
    description: string;
    summary: string;
    instructions: string;
    itemType: ItemType;
    activityId: string;
    routineId: string;
    itemGroupLinkId: string;
    estimatedCompletionSeconds: number;
    exercise: Exercise;
    workoutType: number;
    completed: boolean;
    activities: RoutineActivity[];
}


export interface UpdateWorkoutProps {

    weekItemId: string;
    weekItemWorkoutId: string;
    completed: boolean;
}