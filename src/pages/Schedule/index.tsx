import TodayView from "./Today";
import { useSchedule } from "hooks/useSchedule/useSchedule";
import { ScheduleNotFound } from "./ScheduleNotFound";

export function Schedule() {

    const { data: schedule } = useSchedule({});

    return (
        <div>
            {!schedule
                ? (<ScheduleNotFound />)
                : (<TodayView {...schedule} />)}
                
        </div >
    );
}

export default Schedule;