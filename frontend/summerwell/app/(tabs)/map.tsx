import { View, Text, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Map from "@/components/map";

import React, { useState, useLayoutEffect } from "react";

import { useNavigation } from "expo-router";

import Button from "@/components/ui/button";
import FilterIcon from "@/assets/icons/icon_filter.svg";

export default function MapScreen() {
  const theme = Colors[useColorScheme() ?? "light"];

  const navigation = useNavigation();
  const [isFilterVisible, setFilterVisible] = useState(false);

  const items = ["All", "Stages", "Top-up", "Experiences", "First Aid", "Food & drinks", "Toilets", "Uber pick-up points"];


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          buttonStyle="icon"
          onPress={() => setFilterVisible((prev) => !prev)}
          icon={<FilterIcon fill={isFilterVisible ? theme.selected : Palette.white} width={30} height={30} />} title={undefined}        />
      ),
    });
  }, [navigation, isFilterVisible]);


  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {isFilterVisible && 
      (<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: theme.subheader, flexGrow: 0, height: 47 }} contentContainerStyle={{ alignItems: "center", gap: 20, paddingHorizontal: 20}}>
        {items.map((item, index) => (
          <Text key={index} style={[Typography.Header3, { color: Palette.white }]}>
            {item}
          </Text>
        ))}
      </ScrollView>
    )}


      <Map />

    </View>
  );
}
