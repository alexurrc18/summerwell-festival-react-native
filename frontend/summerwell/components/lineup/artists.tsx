import { View, Text, SectionList, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { Typography } from "@/constants/typography";
import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Artist from "@/components/ui/artist";
import React, { useState, useEffect } from 'react';
import { useApiData } from "@/hooks/apiData";

type ArtistData = {
  id: number;
  name: string;
  image: string;
  stageName: string;
  actStart: string;
  actEnd: string;
  day: number;
};

export default function Artists() {
  const theme = Colors[useColorScheme() ?? "light"];
  const [activeTab, setActiveTab] = useState<"All" | "Friday" | "Saturday" | "Sunday">("All");

  const { data: artists, loading, refreshing, onRefresh } = useApiData<ArtistData[]>('/public/artists', 'cache_artists');
  
  const [filteredArtists, setFilteredArtists] = useState<ArtistData[]>([]);

  useEffect(() => {
    const list = Array.isArray(artists) ? artists : [];

    if (activeTab === "All") {
      setFilteredArtists(list);
    } else {
      const dayMap: { [key: string]: number } = {
        "Friday": 1,
        "Saturday": 2,
        "Sunday": 3,
      };
      const dayNumber = dayMap[activeTab];
      const filtered = list.filter(artist => artist.day === dayNumber);
      setFilteredArtists(filtered);
    }
  }, [activeTab, artists]);

  const chunk = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
    return result;
  };

  const processSections = () => {
    if (!filteredArtists || !Array.isArray(filteredArtists)) return [];

    const sorted = [...filteredArtists].sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    });

    const grouped: { [key: string]: ArtistData[] } = {};

    sorted.forEach((artist) => {
      const name = artist.name || "?";
      const firstLetter = name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) grouped[firstLetter] = [];
      grouped[firstLetter].push(artist);
    });

    return Object.keys(grouped).map((letter) => ({
      title: letter,
      data: chunk(grouped[letter], 2),
    }));
  };

  const sections = processSections();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {/* HEADER TABS */}
      <View style={{ backgroundColor: theme.subheader, height: 45, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 30 }}>
        {(["All", "Friday", "Saturday", "Sunday"] as const).map((tab) => (
          <Pressable key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[Typography.Header3, { color: activeTab === tab ? theme.selected : Palette.white }]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.selected} />
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => (item[0]?.id || index.toString()) + index}
          contentContainerStyle={{ paddingHorizontal: 13, marginTop: 16, paddingBottom: 16 }}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.textDesc}
              colors={[theme.textDesc]}
            />
          }

          renderSectionHeader={({ section: { title } }) => (
            <View style={{ paddingHorizontal: 5 }}>
              <Text style={[Typography.Header2, { color: theme.textDark }]}>
                {title}
              </Text>
            </View>
          )}

          renderSectionFooter={() => (
            <View style={{ height: 2, backgroundColor: theme.devider1, marginBottom: 17, marginTop: 17 }} />
          )}

          ListEmptyComponent={
            <Text style={[Typography.Header3, { textAlign: 'center', marginTop: 20, color: theme.textDesc }]}>
              There are no artists to display.
            </Text>
          }

          renderItem={({ item: row }) => (
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 13 }}>
              {row[0] && <Artist {...row[0]} />}
              {row[1] ? <Artist {...row[1]} /> : <View style={{ width: "50%" }} />}
            </View>
          )}
        />
      )}
    </View>
  );
}