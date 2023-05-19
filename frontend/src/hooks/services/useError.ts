import { useEffect, useState } from 'react';
import { useToast } from '../useToast';
import { ErrorType } from '../api';

type Error = {
    code: string;
    codeNumber: number;
    type: ErrorType;
    message: string;
};

export function useError<TError extends Error>(
    error: TError | null,
    ...errorCodesToDisplay: TError['code'][]
) {
    const { errorToast } = useToast();
    const [errorToDisplay, setErrorToDisplay] = useState<TError | null>(null);

    useEffect(() => {
        if (!error) {
            return;
        }

        if (errorCodesToDisplay.some((code) => code === error.code)) {
            setErrorToDisplay(error);
            return;
        }

        setErrorToDisplay(null);
        errorToast(error.message);
    }, [error]);

    return errorToDisplay;
}
