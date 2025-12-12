import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import HomeIcon from "@/assets/icons/icon_home.svg";
import LocationIcon from "@/assets/icons/icon_location.svg";
import WalletIcon from "@/assets/icons/icon_wallet.svg";
import MoreIcon from "@/assets/icons/icon_dots-horizontal.svg";
import CalendarIcon from "@/assets/icons/icon_calendar.svg";
import { Typography } from "@/constants/typography";

import Button from "@/components/ui/button";
import FilterIcon from "@/assets/icons/icon_filter.svg";

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


      <Tabs.Screen
        name="index"
        options={{
          title: undefined,
          tabBarIcon: ({ color }) => (
            <HomeIcon width={30} height={30} fill={color} />
          ),
        }}
      />



      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <LocationIcon width={30} height={30} fill={color} />
          ),
          headerShown: true, 
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: theme.header, height: 55+insets.top },
          headerTitleStyle: { fontFamily: Typography.Header2.fontFamily, fontSize: Typography.Header2.fontSize, color: Palette.white },
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
        }}
      />



      <Tabs.Screen
        name="lineup"
        options={{
          title: undefined,
          tabBarIcon: ({ color }) => (
            <CalendarIcon width={30} height={30} fill={color} />
          ),
        }}
      />



      <Tabs.Screen
        name="wallet"
        options={{
          title: undefined,
          tabBarIcon: ({ color}) => (
            <WalletIcon width={30} height={30} fill={color} />
          ),
        }}
      />


      <Tabs.Screen
        name="more"
        options={{
          title: undefined,
          tabBarIcon: ({ color}) => (
            <MoreIcon width={30} height={30} fill={color} />
          ),
        }}
      />
  



    </Tabs>


  );
}