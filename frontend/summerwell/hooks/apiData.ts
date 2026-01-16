import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { API_URL, TOKEN_KEY } from '@/constants/config';
import api from '@/services/api';


interface ApiOptions {
  dependency?: any;
}


export function useApiData<Type>( endpoint: string, cacheKey: string, options: ApiOptions = {}) {
  const { dependency } = options;

  const [data, setData] = useState<Type | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  // Normalize data structure
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


  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);

      if (response.status === 200) {
        const json = response.data;
        const cleanData = normalizeData(json);

        await AsyncStorage.setItem(cacheKey, JSON.stringify(cleanData));
        setData(cleanData);
      } else {
        console.warn(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.warn("[WARNING] Servers are unreachable. Using cached data.", error);
    }
  };


  // Initialize data
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
  }, [endpoint, cacheKey, dependency]);


  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [endpoint, cacheKey, dependency]);


  // Refetch when dependencies change
  useEffect(() => {
    fetchData();
  }, [endpoint, dependency]);

  return { data, loading, refreshing, onRefresh };
}

