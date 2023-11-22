import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { usePlan } from "hooks/usePlan/usePlan";
import { useScheduleWeeks } from "hooks/useScheduleWeeks/useScheduleWeeks";
import TodayView from "./Today";

export function Schedule() {

    const { data: plan } = usePlan({});
    const { data: schedule } = useScheduleWeeks({ planId: plan?.id });

    if (!plan || !schedule) {
        return <FullpageLoadingIndicator></FullpageLoadingIndicator>;
    }
    else {
        return (
            <div>
                {plan && (<TodayView plan={plan} scheduleWeeks={schedule} />)}
            </div >
        );
    }
}

export default Schedule;