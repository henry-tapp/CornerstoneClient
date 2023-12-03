import { useEffect, useState } from "react";

const useCountdown = (targetSeconds: number) => {

    const [remainingSeconds, setCountDown] = useState(targetSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(((targetSeconds * 100) - 100) / 100);
        }, 100);

        return () => clearInterval(interval);
    }, [targetSeconds]);

    return remainingSeconds;
};

export { useCountdown };

