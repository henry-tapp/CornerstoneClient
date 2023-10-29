import { usePlan } from "hooks/usePlan/usePlan";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodayView from "./Today";

export function Schedule() {

    const { data: plan, error } = usePlan({});

    const navigate = useNavigate();

    useEffect(() => {

        if (!plan || error) {

            navigate("../wizard");
        }
    }, [navigate, plan, error]);

    return (
        <div>
            {plan && (<TodayView {...plan} />)}
        </div >
    );
}

export default Schedule;