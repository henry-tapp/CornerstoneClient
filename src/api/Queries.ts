
export const Queries = {

    getPlan: () => ["plan"] as const,
    getPlanWeek: (weekNumber: number) => [["planweek"], weekNumber] as const,
    getMultipleWorkoutGroupsForPhase: () => ["multiple_workout_groups_for_phase"] as const
};
