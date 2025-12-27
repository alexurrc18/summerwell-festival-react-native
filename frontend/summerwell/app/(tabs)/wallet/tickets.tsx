import { View, Text, Pressable, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";

import Ticket from "@/components/ui/ticket";
import Button from "@/components/ui/button";

export default function StoreScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const [activeTab, setActiveTab] = useState<"Active tickets" | "Past tickets">("Active tickets");

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {/* TICKETS */}
      <ScrollView style={{ flex: 1, padding: 16}} contentContainerStyle={{ gap: 16, paddingBottom: 75 }}>
        <Ticket type="cart" name="Super Early Bird 2026" description="General Access" color={Palette.cyan} price="350 RON" holder="Alexandru Călin" ticketID="SW2026-0000001" wristbandID="234234234245" balance="473.20" />
        <Ticket type="cart" name="VIP Super Early Bird 2026" description="VIP General Access" color={Palette.purple} price="350 RON" holder="Alexandru Călin" ticketID="SW2026-0000002" wristbandID="10939245245" balance="150.00" />
      </ScrollView>

    </View>
  );
}
