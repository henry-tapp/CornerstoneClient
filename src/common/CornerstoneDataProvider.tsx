import { usePlan } from "hooks/usePlan/usePlan";
import { useScheduleWeeks } from "hooks/useScheduleWeeks/useScheduleWeeks";
import { createContext, useContext } from "react";
import { Plan, ScheduleWeekView } from "types";

export interface StableData {

    plan?: Plan;
    scheduleWeeks?: ScheduleWeekView[];
}

const stableDataContext = createContext<StableData>(undefined as any);

export function CornerstoneDataProvider({ children }: React.PropsWithChildren) {

    const { data: plan } = usePlan({});
    const { data: scheduleWeeks } = useScheduleWeeks({ planId: plan?.id });

    return (
        <stableDataContext.Provider value={{
            plan,
            scheduleWeeks
        }}>
            {children}
        </stableDataContext.Provider>
    );
}

export function useCornerstoneStableData() {
    return useContext(stableDataContext);
}