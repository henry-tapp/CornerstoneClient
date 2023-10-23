
export const Queries = {

    getPlan: () => ["plan"] as const,
    getPlanWeek: (weekNumber: number) => [["planweek"], weekNumber] as const,
    getItemTypes: () => ["item_types"] as const
};
