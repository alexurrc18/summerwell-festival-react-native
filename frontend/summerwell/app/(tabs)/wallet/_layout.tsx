import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Typography } from "@/constants/typography";
import { useRouter } from "expo-router";

import BackIcon from "@/assets/icons/icon_chevron-left.svg";
import CartIcon from "@/assets/icons/icon_cart.svg";
import Button from "@/components/ui/button";

export default function WalletLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const theme = Colors[colorScheme ?? "light"];

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{  
          headerTitle: "My Wallet",         
          headerShown: true, 
          headerTitleAlign: "center",
          headerStyle: { 
            backgroundColor: theme.header, 
            height: 55 + insets.top 
          },
          headerTitleStyle: { 
            fontFamily: Typography.Header2.fontFamily, 
            fontSize: Typography.Header2.fontSize, 
            color: Palette.white 
          },
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
        }} 
      />

      <Stack.Screen
        name="tickets"
        options={{  
          headerTitle: "Tickets",         
          headerShown: true, 
          headerTitleAlign: "center",
          headerStyle: { 
            backgroundColor: theme.header, 
            height: 55 + insets.top 
          },
          headerTitleStyle: { 
            fontFamily: Typography.Header2.fontFamily, 
            fontSize: Typography.Header2.fontSize, 
            color: Palette.white 
          },
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerLeft: () => (
            <Button buttonStyle="icon" icon={<BackIcon width={30} height={30} fill={Palette.white} />} onPress={() => {router.back()}} />
          ),
          headerRight: () => (
            <Button buttonStyle="icon" icon={<CartIcon width={30} height={30} fill={Palette.white} />} onPress={() => {router.back()}} />
          ),
        }} 
      />

      
    </Stack>
  );
}