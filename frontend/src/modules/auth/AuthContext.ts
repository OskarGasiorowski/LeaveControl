import { createContext } from 'react';
import { noop } from 'lodash';

interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
    removeToken: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: noop,
    removeToken: noop,
});
