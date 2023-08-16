import { useState } from 'react';

export function useBoolean(defaultValue = false) {
    const [value, setValue] = useState(defaultValue);

    return {
        value,
        setValue,
        onToggle: () => setValue((prev) => !prev),
    };
}
