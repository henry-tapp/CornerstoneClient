
export const Queries = {

    getSchedule: () => ["schedule"] as const,
    getScheduleWeek: (weekNumber: number) => [["scheduleweek"], weekNumber] as const
};
