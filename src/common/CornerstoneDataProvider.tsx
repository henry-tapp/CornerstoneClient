import { usePlan } from "hooks/usePlan/usePlan";
import { useScheduleWeeks } from "hooks/useScheduleWeeks/useScheduleWeeks";
import { createContext, useContext } from "react";
import { Plan, ScheduleWeekView } from "types";

export interface StableData {

    plan?: Plan;
    scheduleWeeks?: ScheduleWeekView[];
}

const StableDataContext = createContext<StableData>(undefined as any);

export function CornerstoneDataProvider({ children }: React.PropsWithChildren) {

    const { data: plan } = usePlan({});
    const { data: scheduleWeeks } = useScheduleWeeks({ planId: plan?.id });

    return (
        <StableDataContext.Provider value={{
            plan,
            scheduleWeeks
        }}>
            {children}
        </StableDataContext.Provider>
    );
}

export function useCornerstoneStableData() {
    return useContext(StableDataContext);
}