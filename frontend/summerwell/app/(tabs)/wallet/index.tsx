import { View, Text, Pressable, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";

import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import Ticket from "@/components/ui/ticket";
import Button from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function TicketsScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const [activeTab, setActiveTab] = useState<"Active tickets" | "Past tickets">("Active tickets");
  const router = useRouter();
  const { token } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      {/* SUBHEADER */}
            <View style={{ backgroundColor: theme.subheader, height: 45, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 60 }}>
              <Pressable onPress={() => setActiveTab("Active tickets")}>
                <Text style={[Typography.Header3, { color: activeTab === "Active tickets" ? theme.selected : Palette.white }]}>Active tickets</Text>
              </Pressable>
              <Pressable onPress={() => setActiveTab("Past tickets")}>
                <Text style={[Typography.Header3, { color: activeTab === "Past tickets" ? theme.selected : Palette.white }]}>Past tickets</Text>
                </Pressable>
            </View>


      {/* ADD WRISTBAND */}
            <View style={{ backgroundColor: theme.devider1_50, height: 32, justifyContent: "center", alignItems: "center", flexDirection: "row", paddingHorizontal: 60 }}>
                <Text style={[Typography.Regular, { color: theme.textDark }]}>Got a physical ticket? </Text>
              <Pressable onPress={() => { if(token) 
                router.push('/(tabs)/wallet/wristband') 
                else router.push('/(auth)') }}>
                <Text style={[Typography.Body1, { color: theme.selected }]}>Add a wristband</Text>
              </Pressable>
            </View>



      {/* TICKETS */}
      <ScrollView style={{ flex: 1, padding: 16}} contentContainerStyle={{ gap: 16, paddingBottom: 75 }}>
        <Ticket type="wallet" name="Super Early Bird 2026" description="General Access" color={Palette.cyan} price="350 RON" holder="Alexandru Călin" ticketID="SW2026-0000001" wristbandID="234234234245" balance="473.20" />
        <Ticket type="wallet" name="VIP Super Early Bird 2026" description="VIP General Access" color={Palette.purple} price="350 RON" holder="Alexandru Călin" ticketID="SW2026-0000002" wristbandID="10939245245" balance="150.00" />
      </ScrollView>



      {/* BUY TICKETS */}
      <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button variant="secondary" title="BUY TICKETS" onPress={() => {router.push('/(tabs)/wallet/tickets')}} />
      </View>
    </View>
  );
}
