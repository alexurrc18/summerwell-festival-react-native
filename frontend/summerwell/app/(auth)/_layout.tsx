import { AuthProvider } from '@/context/AuthContext';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />


        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="pin"
          options={{ headerShown: false }}
        />
    </Stack>
  );
}