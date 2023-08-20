import { useSnackbar } from 'notistack';

export function useToast() {
    const { enqueueSnackbar } = useSnackbar();

    return {
        errorToast: (message: string) =>
            enqueueSnackbar(message, {
                variant: 'error',
            }),
        successToast: (message: string) =>
            enqueueSnackbar(message, {
                variant: 'success',
            }),
    };
}
