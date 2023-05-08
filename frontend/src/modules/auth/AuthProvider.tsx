import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';

const LOCAL_STORAGE_KEY = 'auth-token';

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_KEY) || undefined);

    function handleSetToken(newToken: string) {
        setToken(newToken);
        localStorage.setItem(LOCAL_STORAGE_KEY, newToken);
    }

    return (
        <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
            {children}
        </AuthContext.Provider>
    );
}
