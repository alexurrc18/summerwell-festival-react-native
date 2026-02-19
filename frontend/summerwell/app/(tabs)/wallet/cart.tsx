import { View, Text, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";

import Ticket from "@/components/ui/ticket";
import Button from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

type TicketType = {
  ticketId: number;
  name: string;
  type: string;
  year: number;
  price: number;
  stock: string;
  color: string;
};

type CartItemType = {
  ticket: TicketType;
};

export default function CartScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const { removeFromCart, token } = useAuth();
  
  const [displayItems, setDisplayItems] = useState<CartItemType[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchCartItems = async () => {
        if (!token) return;
        try {
          const response = await api.get('/user/cart');
          if (isActive) {
            setDisplayItems(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchCartItems();

      return () => {
        isActive = false;
      };
    }, [token])
  );

  const handleRemove = async (ticketId: number) => {
    setDisplayItems(prev => {
      const index = prev.findIndex(item => item.ticket.ticketId === ticketId);
      if (index > -1) {
        const newArray = [...prev];
        newArray.splice(index, 1);
        return newArray;
      }
      return prev;
    });
    
    await removeFromCart(ticketId);
  };

  const totalPrice = displayItems.reduce((sum, item) => sum + item.ticket.price, 0) || 0;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ gap: 16, paddingBottom: 75 }}>
        {displayItems.length > 0 ? (
          displayItems.map((item, index) => (
            <Ticket
              key={`${item.ticket.ticketId}-${index}`} 
              type="cart"
              name={item.ticket.name}
              description={item.ticket.type}
              color={Palette[item.ticket.color as keyof typeof Palette]}
              price={`${item.ticket.price} RON`}
              inCart={true}
              onPress={() => handleRemove(item.ticket.ticketId)}
            />
          ))
        ) : (
          <Text style={[Typography.Header3, { textAlign: 'center', marginTop: 20, color: theme.textDesc }]}>
            There are no tickets available to display.
          </Text>
        )}
        
        <View style={{width: '100%', gap: 5}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={[Typography.Body1, { color: theme.textDesc }]}>Subtotal:</Text>
            <Text style={[Typography.Body1, { color: theme.textDark }]}>{totalPrice} RON</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={[Typography.Header2, { color: theme.textDesc }]}>Total:</Text>
            <Text style={[Typography.Header2, { color: theme.textDark }]}>{totalPrice} RON</Text>
          </View>
        </View>
      </ScrollView>

      <View style={{position: 'absolute', bottom: 16, alignSelf: 'center'}}>
        <Button  title="CONTINUE"  variant="primary"  onPress={() => {router.push("/(tabs)/wallet/checkout")}} disabled={displayItems.length === 0}/>
      </View>
    </View>
  );
}