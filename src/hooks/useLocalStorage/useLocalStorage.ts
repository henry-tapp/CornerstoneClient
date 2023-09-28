import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const [value, setValue] = useState(() => {
        return getItem(key, defaultValue);
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

function getItem<T>(key: string, defaultValue: T) {
    // getting stored value
    const saved = localStorage.getItem(key);
    if (saved) {
        const initial = JSON.parse(saved);
        return initial;
    }
    else {
        return defaultValue;
    }
}