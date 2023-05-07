import {useMutation} from "react-query";
import {useApi} from "#api";

export function useCreateAccount() {
    const { createAccount } = useApi();

    const { mutate, data } = useMutation('create-account', createAccount);
    console.log(data);

    return {
        createAccount: mutate,
    }
}