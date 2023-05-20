import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';

const LOCAL_STORAGE_KEY = 'auth-token';

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_KEY));

    function handleSetToken(newToken: string) {
        setToken(newToken);
        localStorage.setItem(LOCAL_STORAGE_KEY, newToken);
    }

    function handleRemoveToken() {
        setToken(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    return (
        <AuthContext.Provider
            value={{ token, setToken: handleSetToken, removeToken: handleRemoveToken }}
        >
            {children}
        </AuthContext.Provider>
    );
}
