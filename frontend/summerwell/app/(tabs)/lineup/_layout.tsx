import React from "react";
import { View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Typography } from "@/constants/typography";

import XIcon from "@/assets/icons/icon_x.svg";

import Button from "@/components/ui/button";
import Header from "@/components/ui/header";
import { useAuth } from "@/context/AuthContext";

export default function LineupLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const theme = Colors[colorScheme ?? "light"];
  const { token } = useAuth();

  return (
    <Stack>
      
      {/* INDEX*/}
      <Stack.Screen
        name="index"
        options={{
            headerShown: false,
        }}
      />

      <Stack.Screen
        name="artist"
        options={{
          headerShown: false
        
        }}
      />

      

    </Stack>
  );
}