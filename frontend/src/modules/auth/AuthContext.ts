import { createContext } from 'react';

interface AuthContextType {
    token: string | undefined;
    setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setToken: () => {},
});
