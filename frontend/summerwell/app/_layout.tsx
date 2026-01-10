import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import 'react-native-reanimated';
import { useFonts } from "expo-font";
import { Colors } from "@/constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from 'react';
import { API_URL } from '@/constants/config';
import { AuthProvider } from '@/context/AuthContext';


SplashScreen.setOptions({
  duration: 500,
  fade: true
});

SplashScreen.preventAutoHideAsync();




export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const theme = Colors[colorScheme ?? "light"];



  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        console.log("SYSTEM: Preloading data...");
        const [artistsRes, stagesRes] = await Promise.all([ 
          fetch(`${API_URL}/public/artists`),
          fetch(`${API_URL}/public/stages`)
        ]);

        if (artistsRes.ok) {
          const artistsData = await artistsRes.json();
          await AsyncStorage.setItem('cache_artists', JSON.stringify(artistsData));

          const artistList = artistsData.artists || artistsData;

          if (Array.isArray(artistList)) {
            const imageUrls = artistList
              .map((a: any) => a.image)
              .filter((url: any) => typeof url === 'string' && url.length > 0);

            console.log(`SYSTEM: Downloading ${imageUrls.length} images...`);

            const imagePromises = imageUrls.map((url: string) => Image.prefetch(url));

            await Promise.all(imagePromises);

            console.log("[✓] Artist images cached to disk.");
          }

          console.log("[✓] Artists loaded.");
        } else {
          console.log("[✗] Artists not loaded.");
        }

        if (stagesRes.ok) {
          const stagesData = await stagesRes.json();
          await AsyncStorage.setItem('cache_stages', JSON.stringify(stagesData));
          console.log("[✓] Stages loaded.");
        } else {
          console.log("[✗] Stages not loaded.");
        }

      } catch (error) {
        console.warn(`ERROR: ${error}`);
      } finally {
        setAppReady(true);
      }
    } prepare()
  }, []);


  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/poppins_regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/poppins_medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/poppins_semibold.ttf"),
  });


  useEffect(() => {
    if (appReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appReady, fontsLoaded]);

  if (!appReady || !fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>

          <Stack.Screen name="(tabs)" />

          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false}}
          />

        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
