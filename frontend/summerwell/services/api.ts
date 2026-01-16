import axios from 'axios';
import { API_URL, TOKEN_KEY } from '@/constants/config';
import * as SecureStore from 'expo-secure-store';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Token interceptor
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;