import { useState, useEffect } from "react";

const getLocalValue = <T,>(key: string, initValue: T | (() => T)) => {
    // SSR Next.js 
    if (typeof window === 'undefined') return initValue;

    // Retrieve the value from localStorage
    const localValue = localStorage.getItem(key);

    if (localValue) {
        try {
            // Attempt to parse the retrieved value as JSON
            return JSON.parse(localValue);
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
        }
    }

    // Return the initial value if no valid value is found
    if (initValue instanceof Function) return initValue();

    return initValue;
}

const useLocalStorage = <T,>(key: string, initValue: T | (() => T)) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage 