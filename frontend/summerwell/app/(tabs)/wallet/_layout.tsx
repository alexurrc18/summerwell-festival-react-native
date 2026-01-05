import React from "react";
import { View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Typography } from "@/constants/typography";

import BackIcon from "@/assets/icons/icon_chevron-left.svg";
import CartIcon from "@/assets/icons/icon_cart.svg";

import Button from "@/components/ui/button";
import Header from "@/components/ui/header";

export default function WalletLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Stack>
      
      {/* INDEX (My Wallet) */}
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <Header title="My Wallet" backgroundColor={theme.header} 
            />
          ),
        }}
      />

      {/* TICKETS */}
      <Stack.Screen
        name="tickets"
        options={{
          header: () => (
            <Header title="Tickets" backgroundColor={theme.subheader} 
              left= { <Button buttonStyle="icon"  icon={<BackIcon width={30} height={30} fill={Palette.white} />}  onPress={() => router.back()} />
              }
              right={
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Button  buttonStyle="icon" icon={<CartIcon width={30} height={30} fill={Palette.white} />} onPress={() => router.push("/(tabs)/wallet/cart")} />
                  <Text style={[Typography.Header3, { color: Palette.white }]}>2</Text>
                </View>
              }
            />
          ),
        }}
      />

      {/* CART */}
      <Stack.Screen
        name="cart"
        options={{
          header: () => (
            <Header title="Cart" backgroundColor={theme.subheader}
              left={
                <Button buttonStyle="icon" icon={<BackIcon width={30} height={30} fill={Palette.white} />} onPress={() => router.back()} />
              }
            />
          ),
        }}
      />

      {/* CHECKOUT */}
      <Stack.Screen
        name="checkout"
        options={{
          header: () => (
            <Header title="Checkout" backgroundColor={theme.subheader}
              left={
                <Button buttonStyle="icon" icon={<BackIcon width={30} height={30} fill={Palette.white} />} onPress={() => router.back()} />}
            />
          ),
        }}
      />

      {/* WRISTBAND */}
      <Stack.Screen
        name="wristband"
        options={{
          header: () => (
            <Header title="Add Wristband"backgroundColor={theme.subheader} 
              left={ <Button buttonStyle="icon" icon={<BackIcon width={30} height={30} fill={Palette.white} />} onPress={() => router.back()} />}
            />
          ),
        }}
      />

    </Stack>
  );
}