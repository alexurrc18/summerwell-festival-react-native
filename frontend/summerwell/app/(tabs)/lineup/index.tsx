import { View, Text, Pressable } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Palette } from "@/constants/theme";
import { Typography } from "@/constants/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import Artists from "@/components/lineup/artists";
import Schedule from "@/components/lineup/schedule";

export default function LineupScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"lineup" | "schedule">("lineup");

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      {/* HEADER */}
      <View
        style={{
          backgroundColor: theme.header,
          height: 55 + insets.top,
          paddingTop: insets.top,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 43,
        }}
      >
        <Pressable onPress={() => setActiveTab("lineup")}>
          <Text
            style={[
              Typography.Header2,
              { color: activeTab === "lineup" ? theme.selected : Palette.white },
            ]}
          >
            Lineup
          </Text>
        </Pressable>

        <Pressable onPress={() => setActiveTab("schedule")}>
          <Text
            style={[
              Typography.Header2,
              { color: activeTab === "schedule" ? theme.selected : Palette.white },
            ]}
          >
            Schedule
          </Text>
        </Pressable>
      </View>

      {/* CONTENT */}
      {activeTab === "lineup" ? <Artists /> : <Schedule />}
    </View>
  );
}