import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommonActions } from '@react-navigation/native';

import { HapticTab } from "@/components/haptic-tab";
import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import HomeIcon from "@/assets/icons/icon_home.svg";
import LocationIcon from "@/assets/icons/icon_location.svg";
import WalletIcon from "@/assets/icons/icon_wallet.svg";
import MoreIcon from "@/assets/icons/icon_dots-horizontal.svg";
import CalendarIcon from "@/assets/icons/icon_calendar.svg";

import Header from "@/components/ui/header";

export default function TabLayout() {
  const theme = Colors[useColorScheme() ?? "light"];
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.selected,
        tabBarInactiveTintColor: theme.textDark,

        headerShown: false, 
        
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarLabelStyle: { display: "none" },

        tabBarItemStyle: { justifyContent: "center", alignItems: "center" },
        tabBarIconStyle: { marginTop: 0 },

        tabBarStyle: {
          backgroundColor: theme.bottomNav,
          borderTopWidth: 0,
          paddingTop: 10,
          height: 55 + insets.bottom
        },
      }}
    >

      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={30} height={30} fill={color} />
          ),
        }}
      />

      {/* 2. MAP */}
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <LocationIcon width={30} height={30} fill={color} />
          ),
          headerShown: true,
          header: () => (
            <Header 
              title="Map" 
              backgroundColor={theme.header} 
            />
          ),
        }}
      />

      {/* LINEUP */}
      <Tabs.Screen
        name="lineup"
        options={{
          title: "Lineup",
          tabBarIcon: ({ color }) => (
            <CalendarIcon width={30} height={30} fill={color} />
          ),
        }}
      />

      {/* WALLET */}
      <Tabs.Screen
        name="wallet"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'wallet' }],
              })
            );
          },
        })}
        options={{
          title: "My Wallet",
          tabBarIcon: ({ color }) => (
            <WalletIcon width={30} height={30} fill={color} />
          ),
          headerShown: false,
        }}
      />

      {/* MORE */}
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <MoreIcon width={30} height={30} fill={color} />
          ),
        }}
      />

    </Tabs>
  );
}