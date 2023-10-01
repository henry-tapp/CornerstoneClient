import { Schedule } from "types";


export const ViewTypes = ["today", "week", "month"];
export type ViewType = typeof ViewTypes[number];


export interface ViewProps {
    schedule: Schedule;
}

export function getCurrentWeek(startingWeek: Date): number {

    return Math.round((Date.now() - startingWeek.getTime()) / (7 * 24 * 60 * 60 * 1000));
}
