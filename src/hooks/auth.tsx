import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import * as AuthSessions from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, ToastAndroid } from 'react-native';

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
        error?: string
    },

    type?: string
}

const CLIENT_ID = '36f77d7ecb82c0208383';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';


export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

    const [isSigning, setSigning] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

    async function signIn() {

        try {
            setSigning(true);
            const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

            if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
                const authResponse = await api.post("/authenticate", {
                    code: authSessionResponse.params.code
                });

                const { user, token } = authResponse.data as AuthResponse;

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
                await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));

                setUser(user);
            }
        }

        catch (error:any) {
            if(Platform.OS === 'android')
            {
                ToastAndroid.show(`Ocorreu um erro na autenticação!\n ${error.message}`,ToastAndroid.LONG)
            }
        }

        finally {

            setSigning(false);
        }
    }

    async function signOut() {

        await AsyncStorage.multiRemove([USER_STORAGE, TOKEN_STORAGE]);
        setUser(null);
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem(USER_STORAGE);
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

            if (userStorage && tokenStorage) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
                setUser(JSON.parse(userStorage));
            }

            setSigning(false);
        }

        loadUserStorageData();
    }, [])
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