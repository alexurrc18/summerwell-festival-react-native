import React, { createContext, useState, useEffect, useContext } from 'react';
import { TOKEN_KEY } from '@/constants/config';
import * as SecureStore from 'expo-secure-store';
import { useApiData } from '@/hooks/apiData';
import { router } from 'expo-router';
import api from '@/services/api';
import { push } from 'expo-router/build/global-state/routing';
import { Alert } from 'react-native';



interface AuthContextType {
    token: string | null;
    signIn: (email: string) => Promise<boolean>;
    verifyPin: (email: string, pin: string) => Promise<boolean>;
    logout: () => Promise<void>;
    deleteAccount: () => Promise<void>;
    isAuthenticated: (push?: boolean) => boolean;

    localUserData: any;
    updateData: (firstName: string, lastName: string, phoneNumber: string, country: string, city: string, address: string) => Promise<void>;

    isArtistFavorite: (artistId: number) => boolean;
    toggleFavoriteArtist: (artistId: number) => Promise<void>;
    localFavoriteArtists: number[];

    addToCart: (ticketId: number | string) => Promise<void>;
    removeFromCart: (ticketId: number | string) => Promise<void>;
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
        setLocalFavoriteArtists([]);
        setLocalUserData(null);
        setUserToken(null);
    }

    // DELETE ACCOUNT
    const deleteAccount = async () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.post('/user/me/deleteAccount', {});
                            await logout();
                            router.replace('/(tabs)/home');
                        } catch (error) {
                            console.error("Failed to delete account:", error);
                        }
                    }
                }
            ]
        );
    }


    // VERIFY IF USER IS AUTHENTICATED
    function isAuthenticated(push = false) {
        if (!userToken) {
            if (push) router.push('/(auth)');
            return false;
        }
        return true;
    }






    // USER DATA
    // personal details
    const { data: userData } = useApiData<number[]>('/user/me', 'user_data', { dependency: userToken });
    const [localUserData, setLocalUserData] = useState<any>(null);

    useEffect(() => {
        if (!userToken) {
            setLocalUserData(null);
            return;
        }

        if (userData) {
            setLocalUserData(userData);
        }
    }, [userData]);

    const updateData = async (firstName: string, lastName: string, phoneNumber: string, country: string, city: string, address: string) => {
        if (!isAuthenticated(true)) return;
        api.post('/user/me/updateDetails', {
            firstName,
            lastName,
            phoneNumber,
            country,
            city,
            address
        }).then(response => {
        }).catch(error => {
            console.error("Failed to update user data:", error);
        });
    }


    const { data: favoriteArtists } = useApiData<number[]>('/user/favorites/artists', 'favorite_artists', { dependency: userToken });
    const [localFavoriteArtists, setLocalFavoriteArtists] = useState<number[]>([]);

    useEffect(() => {
        if (!userToken) {
            setLocalFavoriteArtists([]);
            return;
        }

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
        if (!isAuthenticated(true)) return;

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


    const addToCart = async (ticketId: number | string) => {
        if (!isAuthenticated(true)) return;

        try {
            await api.post(`/user/cart/add/${ticketId}`, {});
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    const removeFromCart = async (ticketId: number | string) => {
        if (!isAuthenticated(true)) return;

        try {
            await api.delete(`/user/cart/remove/${ticketId}`, {});
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
    };





    return (
        <AuthContext.Provider value={{
            token: userToken, signIn, verifyPin, logout, deleteAccount, isAuthenticated,
            updateData, localUserData,
            isArtistFavorite, toggleFavoriteArtist, localFavoriteArtists,
            addToCart, removeFromCart
        }}>

            {children}

        </AuthContext.Provider>
    )
}
