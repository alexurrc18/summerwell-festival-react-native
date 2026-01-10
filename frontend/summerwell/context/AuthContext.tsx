import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/config';
import { TOKEN_KEY } from '@/constants/config';


interface AuthContextType {
    token: string | null;
    signIn: (email: string) => Promise<boolean>;
    verifyPin: (email: string, pin: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            if (token) setUserToken(token);
        };
        loadToken();
    }, []);


    const signIn = async (email: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/login-request?email=${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            });

            if (response.ok) {
                console.log('[] PIN requested successfully');
                return true;
            }
            return false;
        } catch (error) {
            console.error('[] Error requesting PIN:', error);
            return false;
        }
    }


    const verifyPin = async (email: string, pin: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, pin }),
            });

            if (response.ok) {
                const data = await response.json();
                const serverToken = data.token || data.jwt || data.accessToken;
                if (serverToken) {
                    await AsyncStorage.setItem(TOKEN_KEY, serverToken);
                    setUserToken(serverToken);
                    return true; 
                }
            }
            return false;
        } catch (error) {
            console.error('[] Error verifying PIN:', error);
            return false;
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        setUserToken(null);
    }

    return (
        <AuthContext.Provider value={{ token: userToken, signIn, verifyPin, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
