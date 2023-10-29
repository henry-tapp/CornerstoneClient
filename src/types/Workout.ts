import { Exercise } from "./Exercise";
import { PhaseType, WorkoutEquipment } from "./Item";

export interface WorkoutGroup {

    id: string;
    name: string,
    description: string;
    equipment: WorkoutEquipment;
    phase: PhaseType;
}

export interface SingleWorkoutGroup extends WorkoutGroup {
    workout: Workout;
}

export interface MultipleWorkoutGroup extends WorkoutGroup {
    workouts: Workout[];
}

export interface Workout {

    id: string;
    name: string,
    description: string;
    summary: string;
    workoutType: WorkoutType;
    exercises: Exercise[];
}

export enum WorkoutType {

    Open = 0,
    Fingerboard = 1,
    Bouldering = 2,
    PowerEndurance = 3,
    AerobicBase = 4,
    Conditioning = 5,
    Flexiblity = 6,
    Warmup = 7,
    Cooldown = 8
}

export type WorkoutTypeColour = "#3E5641" | "#F3E8EE" | "#3C787E" | "#83BCA9" | "#D56F3E" | "#A24936";

export interface WorkoutVariation {
    enum: WorkoutType;
    name: string;
    colour: WorkoutTypeColour;
}

export function GetVariation(type: WorkoutType): WorkoutVariation | undefined {
    return workoutVariations.find(x => x.enum === type);
}

export const workoutVariations = [
    { enum: WorkoutType.Open, name: "Open Session", colour: "" },
    { enum: WorkoutType.Fingerboard, name: "Fingerboard", colour: "#3C787E" },
    { enum: WorkoutType.Bouldering, name: "Strength & Power", colour: "#653E63" },
    { enum: WorkoutType.PowerEndurance, name: "Power Endurance", colour: "#D56F3E" },
    { enum: WorkoutType.AerobicBase, name: "Aerobic Base", colour: "#C7EF00" },
    { enum: WorkoutType.Conditioning, name: "Conditioning", colour: "#D0CD94" },
    { enum: WorkoutType.Flexiblity, name: "Flexibility", colour: "" },
    { enum: WorkoutType.Warmup, name: "Warmup", colour: "" },
    { enum: WorkoutType.Cooldown, name: "Cooldown", colour: "" }
] as WorkoutVariation[]
