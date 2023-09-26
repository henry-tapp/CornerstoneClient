
export interface Item {
    id: number;
    name: string;
    description: string;
    variation: WorkoutVariation;
    exercises: number;
    estimatedCompletionMinutes: number;
}

export type WorkoutType = "Strength & Power" | "Conditioning" | "Fingerboard" | "Aerobic Base" | "Power Endurance";

export type WorkoutTypeColor = "#653E63" | "#D0CD94" | "#3C787E" | "#C7EF00" | "#D56F3E";

export interface WorkoutVariation {
    Name: WorkoutType;
    Color: WorkoutTypeColor;
}

export interface ItemGroup extends Omit<Item, "exericses"> {
    items?: Exercise[];
}

export interface Exercise extends Omit<Item, "exericses" | "variation"> {
    reps: number;
    sets: number;
    repTime: number;
    repRest: number;
    setRest: number;
}


export const workoutVariations = [
    { Name: "Strength & Power", Color: "#653E63" },
    { Name: "Conditioning", Color: "#D0CD94" },
    { Name: "Fingerboard", Color: "#3C787E" },
    { Name: "Aerobic Base", Color: "#C7EF00" },
    { Name: "Power Endurance", Color: "#D56F3E" }
]

export function GetVariation(type: WorkoutType) {
    return workoutVariations.find(x => x.Name === type);
}