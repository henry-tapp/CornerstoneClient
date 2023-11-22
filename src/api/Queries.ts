
export const Queries = {

    getPlan: () => ["plan"] as const,
    getScheduleWeeks: () => ["scheduleWeeks"] as const,
    getWeekItems: (weekId?: string) => [["scheduleWeekItems"], weekId] as const,
    getWeekItemWorkouts: (weekItemId?: string) => [["weekItemWorkouts"], weekItemId] as const,
    getMultipleWorkoutGroupsForPhase: () => ["multiple_workout_groups_for_phase"] as const
};
