import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState, useMemo } from "react";

import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import Ticket from "@/components/ui/ticket";
import Button from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useApiData } from "@/hooks/apiData";

type UserTicketType = {
  userId: number;
  ticketId: number;
  ticketName: string;
  ticketType: string;
  ticketColor: string;
  ticketCode: string;
  wristbandCode: string | null;
  wristbandPin: string | null;
  price: number;
  purchaseDate: string;
  isScanned: boolean;
  year: string;
};


type AppSettingsData = {
  id: number;
  optionName: string;
  value: string;
};

export default function TicketsScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const [activeTab, setActiveTab] = useState<"Active tickets" | "Past tickets">("Active tickets"); 
  const router = useRouter();
  const { token, localUserData } = useAuth();

  const { data: tickets } = useApiData<UserTicketType[]>('/user/tickets', 'cache_user_tickets', { dependency: token });
  const { data: settings } = useApiData<AppSettingsData[]>('/public/app_settings', 'cache_app_settings');

  const currentYear = settings?.find(s => s.optionName === 'current_edition_year')?.value;

  const filteredTickets = useMemo(() => {
    if (!tickets) return [];

    return tickets.filter((ticket) => {
      const isCurrentEdition = ticket.year === currentYear;
      return activeTab === "Active tickets" ? isCurrentEdition : !isCurrentEdition;
    });
  }, [tickets, activeTab]);

  const holderName = localUserData ? `${localUserData.firstName} ${localUserData.lastName}` : "Summer Well Fan";

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


      {/* ADD WRISTBAND
            <View style={{ backgroundColor: theme.devider1_50, height: 32, justifyContent: "center", alignItems: "center", flexDirection: "row", paddingHorizontal: 60 }}>
                <Text style={[Typography.Regular, { color: theme.textDark }]}>Got a physical ticket? </Text>
              <Pressable onPress={() => { if(token) 
                router.push('/(tabs)/wallet/wristband') 
                else router.push('/(auth)') }}>
                <Text style={[Typography.Body1, { color: theme.selected }]}>Add a wristband</Text>
              </Pressable>
            </View>
      */
      }



      {/* TICKETS */}
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        contentContainerStyle={{ gap: 16, paddingBottom: 75 }}
      >
        {!tickets ? (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
            <Text style={[Typography.Header3, { color: theme.textDesc }]}>
              {activeTab === "Active tickets" ? "No active tickets found." : "No past tickets found."}
            </Text>
          </View>
        ) : filteredTickets.length > 0 ? (
          filteredTickets.map((item, index) => (
            <Ticket
              key={`${item.ticketCode}-${index}`}
              type="wallet"
              name={item.ticketName}
              description={item.ticketType}
              color={Palette[item.ticketColor as keyof typeof Palette]}
              holder={holderName}
              ticketID={item.ticketCode}
              wristbandID={item.wristbandCode || "N/A"}
              balance={item.price ? `${item.price}` : "0.00"}
            />
          ))
        ) : (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
            <Text style={[Typography.Header3, { color: theme.textDesc }]}>
              {activeTab === "Active tickets" ? "No active tickets found." : "No past tickets found."}
            </Text>
          </View>
        )}
      </ScrollView>



      {/* BUY TICKETS */}
      <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button variant="secondary" title="BUY TICKETS" onPress={() => { router.push('/(tabs)/wallet/tickets') }} />
      </View>
    </View>
  );
}