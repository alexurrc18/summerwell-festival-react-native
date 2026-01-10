import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/config';

const TOKEN_KEY = 'userToken';

interface ApiOptions {
  requiresAuth?: boolean;
}

export function useApiData<Type>( endpoint: string, cacheKey: string, options: ApiOptions = {}) {
  const { requiresAuth = false } = options;

  const [data, setData] = useState<Type | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const normalizeData = (input: any): Type => {
    if (!input) return input;
    if(typeof input === 'object'){
      const array = Object.values(input).find(v => Array.isArray(v));
      if(array){
        return array as unknown as Type;
      }
    }
    return input as Type;
  }

  const fetchData = async () => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (requiresAuth) {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: headers,
      });

      if (response.ok) {
        const json = await response.json();
        const cleanData = normalizeData(json);

        await AsyncStorage.setItem(cacheKey, JSON.stringify(cleanData));
        setData(cleanData);
      } else {
        console.warn(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.log("Offline mode.");
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) setData(JSON.parse(cached));
      } catch (e) { }
      finally { setLoading(false); }

      await fetchData();
    };
    init();
  }, [endpoint, cacheKey, requiresAuth]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [endpoint, cacheKey, requiresAuth]);

  return { data, loading, refreshing, onRefresh };
}