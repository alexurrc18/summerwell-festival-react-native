import { View, Text, Pressable, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";

import Ticket from "@/components/ui/ticket";
import Button from "@/components/ui/button";
import { useApiData } from "@/hooks/apiData";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

type TicketType = {
  ticketId: string;
  name: string;
  type: string;
  year: number;
  price: number;
  stock: string;
  color: string;
};

export default function StoreScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const [activeTab, setActiveTab] = useState<"Active tickets" | "Past tickets">("Active tickets");

  const { data: tickets, loading, refreshing, onRefresh } = useApiData<TicketType[]>('/public/tickets', 'cache_tickets');
  const { token } = useAuth();
  const router = useRouter();


  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {/* TICKETS */}
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ gap: 16, paddingBottom: 75 }}>
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket) => (
              <Ticket
                key={ticket.ticketId}
                type="cart"
                name={ticket.name}
                description={ticket.type}
                color={Palette[ticket.color as keyof typeof Palette]}
                price={ticket.price + " RON"}
                onPress={() => {
                  if (!token)
                    router.push('/(auth)');
                }}
              />
            ))
        ) : (
          <Text style={[Typography.Header3, { textAlign: 'center', marginTop: 20, color: theme.textDesc }]}>
            There are no tickets available to display.
          </Text>
        )}


      </ScrollView>

    </View>
  );
}
