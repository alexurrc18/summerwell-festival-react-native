import { View, Text, Pressable, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";

import Ticket from "@/components/ui/ticket";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function WristbandScreen() {
  const theme = Colors[useColorScheme() ?? "light"];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background,  padding: 16 }}>

      <View style={{ flex: 1, gap: 50}}>
      {/* Form*/}
      <View style={{ gap: 16 }}>
        <View style={{ gap: 5 }}>
          <Text style={[Typography.Header3, { color: theme.textDark }]}>Add Wristband</Text>
          <Input />
        </View>

        <View style={{ gap: 5 }}>
          <Text style={[Typography.Header3, { color: theme.textDark }]}>Pin</Text>
          <Input />
        </View>
      </View>

      <Button variant="primary" title="ADD WRISTBAND" onPress={() => { }} />
      </View>


    </View>
  );
}
