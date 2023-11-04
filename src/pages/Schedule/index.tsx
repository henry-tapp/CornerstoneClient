import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { usePlan } from "hooks/usePlan/usePlan";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodayView from "./Today";

export function Schedule() {

    const [planId, setPlanId] = useLocalStorage("planId", "");
    const { data: plan, error } = usePlan({});

    const navigate = useNavigate();

    useEffect(() => {

        if (!plan || error) {

            navigate(0);
            setPlanId("");
        }
    }, [navigate, setPlanId, plan, error]);

    return (
        <div>
            {plan && (<TodayView {...plan} />)}
        </div >
    );
}

export default Schedule;