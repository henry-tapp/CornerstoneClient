import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { usePlan } from "hooks/usePlan/usePlan";
import { useScheduleWeeks } from "hooks/useScheduleWeeks/useScheduleWeeks";
import WeekView from "./WeekView";

export function Index() {

    const { data: plan } = usePlan({});
    const { data: schedule } = useScheduleWeeks({ planId: plan?.id });

    if (!plan || !schedule) {
        return <FullpageLoadingIndicator></FullpageLoadingIndicator>;
    }
    else {
        return (<>
            {plan && (<WeekView plan={plan} scheduleWeeks={schedule} />)}
        </>
        );
    }
}

export default Index;