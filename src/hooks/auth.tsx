import React, { createContext, ReactNode, useContext, useState } from 'react';

import * as AuthSessions from 'expo-auth-session';

interface User {
    id: string;
    avatar_url: string;
    name: string;
}
interface AuthContextData {
    user: User | null;
    isSigning: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode
}

interface AuthResponse {
    token: string;
    user: User;
}

interface AuthorizationResponse {
    params: {
        code?: string
    }
}

const CLIENT_ID = '';
const SCOPE = '';

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

    const [isSigning, setSigning] = useState(false);
    const [user, setUser] = useState<User | null>(null);



    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

    async function signIn() {

    }

    async function signOut() {

    }
    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            user,
            isSigning
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }