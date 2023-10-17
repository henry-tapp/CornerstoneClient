
export type WorkoutType = "Strength & Power" | "Conditioning" | "Fingerboard" | "Aerobic Base" | "Power Endurance" | "Fun" | "Rest";

export type WorkoutTypeColor = "#3E5641" | "#F3E8EE" | "#3C787E" | "#83BCA9" | "#D56F3E" | "#A24936";

export interface WorkoutVariation {
    Name: WorkoutType;
    Color: WorkoutTypeColor;
}

export function GetVariation(type: WorkoutType) {
    return workoutVariations.find(x => x.Name === type);
}

export const workoutVariations = [
    { Name: "Strength & Power", Color: "#653E63" },
    { Name: "Conditioning", Color: "#D0CD94" },
    { Name: "Fingerboard", Color: "#3C787E" },
    { Name: "Aerobic Base", Color: "#C7EF00" },
    { Name: "Power Endurance", Color: "#D56F3E" },
    { Name: "Flexibility", Color: "" }
]
