import { WeekDay } from "./WeekDay";
import { WorkoutVariation } from "./Workout";

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

export type WeekDayItems = Record<WeekDay, Item[]>;

export interface ItemType {
    id: string;
    name: string;
}