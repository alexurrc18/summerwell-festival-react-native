import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from "expo-font";
import { Colors } from "@/constants/theme";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const theme = Colors[colorScheme ?? "light"];


  const [loaded] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/poppins_regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/poppins_medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/poppins_semibold.ttf"),
  });


  const isLoggedIn = true;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <Stack>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style={'light'} />
    </ThemeProvider>
  );
}
