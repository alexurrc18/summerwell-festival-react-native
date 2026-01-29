import { View, Text, Pressable, ScrollView } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Palette } from "@/constants/theme";
import { Typography } from "@/constants/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { Image } from "expo-image";
import Header from "@/components/ui/header";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/ui/button";
import * as WebBrowser from 'expo-web-browser';

import XIcon from "@/assets/icons/icon_x.svg";
import SpotifyIcon from "@/assets/icons/icon_spotify.svg";
import InstagramIcon from "@/assets/icons/icon_instagram.svg";
import FavHeart from "@/components/ui/favHeart";
import ChevronLeftIcon from "@/assets/icons/icon_chevron-left.svg";

export default function artistModal() {
  const theme = Colors[useColorScheme() ?? "light"];
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"lineup" | "schedule">("lineup");

  const { id, name, image, description, urlInstagram, urlSpotify } = useLocalSearchParams();
  const artistName = name as string;
  const artistImage = decodeURIComponent(image as string);
  const artistDesc = description as string;
  const artistId = Number(id as string);



  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header backgroundColor={theme.subheader} title={artistName} left={
        <Button
          variant="icon"
          icon={
            <ChevronLeftIcon width={35} height={35} fill={Palette.white} />
          }
          onPress={() => { router.back() }} />}

        right={<FavHeart id={artistId} />}
      />

      <ScrollView style={{ flex: 1, marginTop: 0 }}>
        <Image
          source={{ uri: artistImage }}
          contentFit="cover"
          style={{ width: "100%", height: 350 }}
        />

        <View style={{ marginHorizontal: 16, marginTop: 8, marginBottom: 32 }}>

          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 16 }}>
            <Text style={[Typography.Header2, { color: theme.textDark }]}>{artistName}</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {urlInstagram && (
                <Button variant="icon" icon={
                  <InstagramIcon width={30} height={30} fill={theme.textDark} />
                } onPress={() => {
                  const instagramUrl = urlInstagram as string;
                  WebBrowser.openBrowserAsync(instagramUrl);
                }}
                />
              )}

              {urlSpotify && (
                <Button variant="icon" icon={
                  <SpotifyIcon width={30} height={30} fill={theme.textDark} />
                } onPress={() => {
                  const spotifyUrl = urlSpotify as string;
                  WebBrowser.openBrowserAsync(spotifyUrl);
                }}
                />
              )}
            </View>
          </View>

          <View style={{ marginTop: 16, gap: 10 }}>
          <Text style={[Typography.Header3, { color: theme.primary }]}>Description</Text>
          <Text style={[Typography.Body1, { color: theme.textDesc }]}>{artistDesc}</Text>
          </View>

        </View>

      </ScrollView>
    </View>
  );
}