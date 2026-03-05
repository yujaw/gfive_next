import useLocalStorage from "@/hooks/useLocalStorage";
import { ChangeEvent } from "react";

const useInput = (key: string, initValue: string) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const reset = () => setValue(initValue);

    const attributeObj = {
        value,
        onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    }

    return [value, reset, attributeObj];
}

export default useInput 