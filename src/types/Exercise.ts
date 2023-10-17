import { Item } from "./Item";

export interface Exercise extends Omit<Item, "exericses" | "variation"> {
    reps: number;
    sets: number;
    repTime: number;
    repRest: number;
    setRest: number;
}

export interface ExerciseGroup extends Omit<Item, "exericses"> {
    items?: Exercise[];
}
