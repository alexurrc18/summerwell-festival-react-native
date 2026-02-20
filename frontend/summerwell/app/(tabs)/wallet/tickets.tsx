import { View, Text, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState, useCallback } from "react";

import Ticket from "@/components/ui/ticket";
import { useApiData } from "@/hooks/apiData";
import { useAuth } from "@/context/AuthContext";
import { router, useFocusEffect } from "expo-router";
import Button from "@/components/ui/button";

import CartIcon from "@/assets/icons/icon_cart.svg";
import BackIcon from "@/assets/icons/icon_chevron-left.svg";

import api from "@/services/api";
import Header from "@/components/ui/header";

type TicketType = {
  ticketId: number;
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

  const { data: tickets } = useApiData<TicketType[]>('/public/tickets', 'cache_tickets');
  const { addToCart, token } = useAuth();

  const [cartCount, setCartCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchCartCount = async () => {
        if (token) {
          try {
            const response = await api.get('/user/cart/count');
            setCartCount(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      };

      fetchCartCount();
    }, [token])
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header title="Tickets" backgroundColor={theme.subheader}
        left={<Button variant="icon" icon={<BackIcon width={30} height={30} fill={Palette.white} />} onPress={() => router.back()} />}
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Button variant="icon" icon={<CartIcon width={30} height={30} fill={Palette.white} />} onPress={() => {
              if (token) {
                router.push("/(tabs)/wallet/cart");
              } else {
                router.push("/(auth)");
              }
            }} />
            <Text style={[Typography.Header3, { color: Palette.white }]}>
              {cartCount > 0 ? cartCount : "0"}
            </Text>
          </View>
        }
      />

      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ gap: 16, paddingBottom: 75 }}>
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Ticket
              key={ticket.ticketId}
              type="cart"
              name={ticket.name}
              description={ticket.type}
              color={Palette[ticket.color as keyof typeof Palette]}
              price={`${ticket.price} RON`}
              onPress={async () => {
                setCartCount(prev => prev + 1);
                try {
                  await addToCart(ticket.ticketId);
                } catch (error) {
                  setCartCount(prev => prev - 1);
                }
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