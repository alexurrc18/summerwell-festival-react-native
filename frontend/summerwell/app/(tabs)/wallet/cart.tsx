import { View, Text, Pressable, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";

import Ticket from "@/components/ui/ticket";
import Button from "@/components/ui/button";
import { router } from "expo-router";

export default function CartScreen() {
  const theme = Colors[useColorScheme() ?? "light"];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {/* TICKETS */}
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ gap: 16, paddingBottom: 75 }}>
        


        <View style={{width: '100%', gap: 5}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={[Typography.Body1, { color: theme.textDesc }]}>Subtotal:</Text>
            <Text style={[Typography.Body1, { color: theme.textDark }]}>0 RON</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={[Typography.Header2, { color: theme.textDesc }]}>Total:</Text>
            <Text style={[Typography.Header2, { color: theme.textDark }]}>0 RON</Text>
          </View>
        </View>
      </ScrollView>

      <View style={{position: 'absolute', bottom: 16, alignSelf: 'center'}}>
          <Button title="CONTINUE" variant="primary" onPress={() => {router.push("/(tabs)/wallet/checkout")}}/>
      </View>

    </View>
  );
}
