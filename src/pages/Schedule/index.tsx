import { usePlan } from "hooks/usePlan/usePlan";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodayView from "./Today";

export function Schedule() {

    const { data: schedule, error } = usePlan({});

    const navigate = useNavigate();

    useEffect(() => {

        if (!schedule || error) {

            navigate("../wizard");
        }
    }, [navigate, schedule, error]);

    return (
        <div>
            {schedule && (<TodayView {...schedule} />)}
        </div >
    );
}

export default Schedule;