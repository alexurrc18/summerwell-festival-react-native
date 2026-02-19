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
  duration: 250,
  fade: true
});




export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const theme = Colors[colorScheme ?? "light"];

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/poppins_regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/poppins_medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/poppins_semibold.ttf"),
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>

          <Stack.Screen name="index" options={{ animation: "fade", animationDuration: 250 }} />

          <Stack.Screen name="(tabs)" options={{ animation: "fade", animationDuration: 250 }}/>

          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false, presentation: 'fullScreenModal' }}
          />

        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
