export interface WorkoutLog extends WorkoutLogMeasures {

    weekItemWorkoutId: string;
}

export interface WorkoutLogMeasures {

    effort: number;
    weight?: number;
    notes?: string;
}