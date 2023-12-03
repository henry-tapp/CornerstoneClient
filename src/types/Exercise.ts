
export interface Exercise {
    id: string;
    activityId: string;
    sets: number;
    setRest: number;
    reps: number;
    repTime: number;
    repRest: number;
    rpe: number;
    weight: number | null;
    variant: Variant | null;
    estimatedDuration: number;
    hasEasierVariant: boolean;
    hasHarderVariant: boolean;
}

export enum Variant {
    // Flexibility // Climbing etc.
    A = 1,
    B = 2,
    C = 3,
    D = 4,
    E = 5,

    // Gym
    Hypertrophy = 6,
    Strength = 7,
}
