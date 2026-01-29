import { View, Text, Pressable, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";

import ChevronIcon from "@/assets/icons/icon_chevron-left.svg";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { ExpandableSection } from "@/components/ui/expandable-section";

export default function CartScreen() {
  const theme = Colors[useColorScheme() ?? "light"];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ paddingBottom: 75 }}>

        {/* Voucher */}
        <ExpandableSection title="1. Voucher">
          <View style={{ gap: 5 }}>
            <Text style={[Typography.Body1, { color: theme.textDesc }]}>Do you have a voucher code? Add it below:</Text>
            <View style={{ flexDirection: 'row', gap: 10, height: 45 }}>
              <View style={{ flex: 1 }}><Input placeholder="Voucher" /></View>
              <Button variant="secondary" title="APPLY" onPress={() => { }} />
            </View>
          </View>
        </ExpandableSection>

        {/* Billing Address */}
        <ExpandableSection title="2. Billing Address">
          <View style={{ gap: 12 }}>

            <View style={{ flex: 1, gap: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, gap: 5 }}>
                <Text style={[Typography.Body1, { color: theme.textDesc }]}>First Name</Text>
                <Input placeholder="First Name" style={{height: 45}} />
              </View>
              <View style={{ flex: 1, gap: 5 }}>
                <Text style={[Typography.Body1, { color: theme.textDesc }]}>Last Name</Text>
                <Input placeholder="Last Name" style={{height: 45}}  />
              </View>
            </View>

            <View style={{ flex: 1, gap: 5 }}>
              <Text style={[Typography.Body1, { color: theme.textDesc }]}>Phone Number</Text>
              <Input placeholder="Phone Number" style={{height: 45}} />
            </View>

            <View style={{ flex: 1, gap: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, gap: 5 }}>
                <Text style={[Typography.Body1, { color: theme.textDesc }]}>Country</Text>
                <Input placeholder="Country" style={{height: 45}} />
              </View>
              <View style={{ flex: 1, gap: 5 }}>
                <Text style={[Typography.Body1, { color: theme.textDesc }]}>City</Text>
                <Input placeholder="City" style={{height: 45 }} />
              </View>
            </View>

            <View style={{ flex: 1, gap: 5 }}>
              <Text style={[Typography.Body1, { color: theme.textDesc }]}>Address</Text>
              <Input placeholder="Address" style={{height: 45 }} />
            </View>

          </View>
        </ExpandableSection>

        {/* Ticket Holders */}
        <ExpandableSection title="3. Ticket Holders">
          <View style={{ gap: 5 }}>
            <Text style={[Typography.Body1, { color: theme.textDesc }]}>Do you have a voucher code? Add it below:</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}><Input placeholder="Code" /></View>
              <Button variant="secondary" title="APPLY" onPress={() => { }} />
            </View>
          </View>
        </ExpandableSection>







        <View style={{ alignSelf: 'center', gap: 10 }}>
          <View style={{ width: 220, alignSelf: 'center' }}>
            <Button title="PLACE ORDER" variant="primary" />
          </View>

          <View style={{ paddingHorizontal: 4 }}>
            <Text style={[Typography.Body2, { color: theme.textDark, textAlign: 'center', lineHeight: 20 }]}> By placing the order you've read and accepted our{' '}
              <Text style={[Typography.Body2, { color: theme.primary }]} onPress={() => console.log('Terms pressed')} >Terms & Conditions</Text> {' '}and festival's{' '}
              <Text style={[Typography.Body2, { color: theme.primary }]} onPress={() => console.log('Privacy pressed')}>Privacy Policy.</Text>
            </Text>
          </View>

        </View>

      </ScrollView >

    </View >
  );
}
