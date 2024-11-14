import React, { createContext, useState } from 'react';

interface AuthData {
    username: string;
    password: string;
}

interface AuthContextProps {
    authData: AuthData | null;
    setAuthData: (data: AuthData | null) => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    authData: null,
    setAuthData: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};
