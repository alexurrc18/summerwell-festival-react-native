import { View, Text, SectionList, Pressable } from "react-native";
import { Typography } from "@/constants/typography";
import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Artist from "@/components/ui/artist";
import React, { useState } from "react";

export default function Artists() {
  const theme = Colors[useColorScheme() ?? "light"];
  const [activeTab, setActiveTab] = useState<"All" | "Friday" | "Saturday" | "Sunday">("All");



  {/*TO POPULATE LATER*/}

  const rawArtists = [
    {
      title: "C",
      data: [
        { id: "clairo", name: "Clairo", image: "https://cdn-images.dzcdn.net/images/cover/6dfa4ea965a74b93870a85daa74b7ca3/0x1900-000000-80-0-0.jpg" },
        { id: "chappell", name: "Chappell Roan", image: "https://media.pitchfork.com/photos/64ff1676931354660ba71d8b/1:1/w_4358,h_4358,c_limit/Chappell-Roan-Princess.jpg" },
        { id: "charli", name: "Charli XCX", image: "https://www.atlanticrecords.com/sites/g/files/g2000015596/files/styles/artist_image_detail/public/2024-06/Charli%20XCX%20Main%20Press%20Photo%20_Credit_Harley%20Weir_0.jpg?itok=So3jfGNt" },
      ]
    },
    {
      title: "F",
      data: [
        { id: "fontaines", name: "Fontaines D.C.", image: "https://i.scdn.co/image/ab67616100005174c4b9cd69cf77ce41487dd69a" }
      ]
    }
  ];

  const chunk = (arr: string | any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
    return result;
  };

  const sections = rawArtists.map((s) => ({
    ...s,
    data: chunk(s.data, 2),
  }));

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      {/* SUBHEADER */}
      <View style={{ backgroundColor: theme.subheader, height: 45, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 30 }}>
        <Pressable onPress={() => setActiveTab("All")}>
          <Text style={[Typography.Header3, { color: activeTab === "All" ? theme.selected : Palette.white }]}>All</Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab("Friday")}>
          <Text style={[Typography.Header3, { color: activeTab === "Friday" ? theme.selected : Palette.white }]}>Friday</Text>
          </Pressable>
        <Pressable onPress={() => setActiveTab("Saturday")}>
          <Text style={[Typography.Header3, { color: activeTab === "Saturday" ? theme.selected : Palette.white }]}>Saturday</Text>
          </Pressable>
        <Pressable onPress={() => setActiveTab("Sunday")}>
          <Text style={[Typography.Header3, { color: activeTab === "Sunday" ? theme.selected : Palette.white }]}>Sunday</Text>
        </Pressable>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item[0].id + index}
        contentContainerStyle={{ paddingHorizontal: 13, marginTop: 16, paddingBottom: 16 }}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}

        renderSectionHeader={({ section: { title } }) => (
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={[Typography.Header2, { color: theme.textDark }]}>
              {title}
            </Text>
          </View>
        )}

        renderSectionFooter={({ section: sections }) => (
          <View
            style={{
              height: 2,
              backgroundColor: theme.devider1,
              marginBottom: 17,
              marginTop: 17,
            }}
          />
        )}

        renderItem={({ item: row }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 13,
            }}
          >
            <Artist {...row[0]} />
            {row[1] ? <Artist {...row[1]} /> : <View style={{ width: "50%" }} />}
          </View>
        )}
      />
    </View>
  );
}