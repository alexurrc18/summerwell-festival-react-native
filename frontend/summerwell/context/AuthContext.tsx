import React, { createContext, useState, useEffect, useContext, use } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/config';
import { TOKEN_KEY } from '@/constants/config';
import * as SecureStore from 'expo-secure-store';
import { useApiData } from '@/hooks/apiData';
import { router } from 'expo-router';
import axios from 'axios';
import api from '@/services/api';



interface AuthContextType {
    token: string | null;
    signIn: (email: string) => Promise<boolean>;
    verifyPin: (email: string, pin: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isAuthenticated: () => boolean;

    isArtistFavorite: (artistId: number) => boolean;
    toggleFavoriteArtist: (artistId: number) => Promise<void>;
    localFavoriteArtists: number[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);


    // LOAD TOKEN ON STARTUP
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) setUserToken(token);
        };
        loadToken();
    }, []);



    // SIGN IN FUNCTION
    const signIn = async (email: string) => {
        try {
            const response = await api.post(`/auth/login-request`, null, {
                params: { email },
            });

            return response.status === 200;
        } catch (error) {
            console.error('ERROR: PIN could not be requested.', error);
            return false;
        }
    }




    // VERIFY PIN FUNCTION
    const verifyPin = async (email: string, pin: string) => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        try {
            const response = await api.post(`/auth/verify`, { email, pin });

            if (response.status === 200) {
                const data = response.data;
                const serverToken = data.token;
                if (serverToken) {
                    await SecureStore.setItemAsync(TOKEN_KEY, serverToken);
                    setUserToken(serverToken);
                    return true;
                }
            }
            return false;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.error('WRONG: Invalid PIN provided.');
                return false;
            } else {
            console.error('ERROR: PIN could not be verified.', error);
            }
            return false;
        }
    }



    // LOGOUT FUNCTION
    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setUserToken(null);
    }


    // VERIFY IF USER IS AUTHENTICATED
    const isAuthenticated = () => {
        if (!userToken) {
            router.push('/(auth)');
            return false;
        }
        return true;
    }






    // USER DATA
    // Favorite artists
    const { data: favoriteArtists } = useApiData<number[]>('/user/favorites/artists', 'user_favorite_artists', { dependency: userToken });
    const [localFavoriteArtists, setLocalFavoriteArtists] = useState<number[]>([]);
    
    useEffect(() => {
        if (favoriteArtists) {
            let ids: number[] = [];
            ids = favoriteArtists.map((item: any) => item.artist.id);
            setLocalFavoriteArtists(ids);
        }
    }, [favoriteArtists]);


    const isArtistFavorite = (artistId: number) => {
        if (localFavoriteArtists.includes(artistId))
            return true;
        else return false;
    };


    const toggleFavoriteArtist = async (artistId: number) => {
        if (!isAuthenticated()) return;

        let updatedFavorites: number[] = [];
        if (isArtistFavorite(artistId)) {
            updatedFavorites = localFavoriteArtists.filter(id => id !== artistId);
        } else {
            updatedFavorites = [...localFavoriteArtists, artistId];
        }
        setLocalFavoriteArtists(updatedFavorites);

        try {
            await api.post(`/user/favorites/artists/toggle/${artistId}`, {});
        } catch (error) {
            console.error("Failed to toggle favorite artist:", error);
        }
    };





 

    return (
        <AuthContext.Provider value={{ token: userToken, signIn, verifyPin, logout, isAuthenticated, isArtistFavorite, toggleFavoriteArtist, localFavoriteArtists }}>
            {children}
        </AuthContext.Provider>
    )
}
