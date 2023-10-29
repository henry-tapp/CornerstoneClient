
export interface Exercise {
    id: string;
    workoutId: string;
    reps: number;
    sets: number;
    repTime: number;
    repRest: number;
    setRest: number;
    type: ExerciseType;
    weight?: number;
    estimatedDuration: number;
    hasEasierVariant: boolean;
    hasHardervariant: boolean;
}

export enum ExerciseType {
    Activity = 0,
    Hypertrophy = 1,
    Strength = 2,
    Endurance = 3,
    Warmup = 4,
    Cooldown = 5,
    Stretching = 6
}