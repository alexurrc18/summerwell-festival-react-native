import React, { useCallback, useEffect } from "react";
import { View, Image, Text, ScrollView, AppState } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from "expo-video";

import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Button from "@/components/ui/button";
import Artist from "@/components/ui/artist";
import { useFocusEffect, useRouter } from "expo-router";

import BellIcon from "@/assets/icons/icon_bell.svg";

export default function HomeScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const player = useVideoPlayer(require("@/assets/videos/bg_video.mp4"), (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });



  // player stuff

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state: string) => {
      if (state === "active") {
        try {
          player.play();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          player.pause();
        } catch (error) {
          console.log(error);
        }
      }
    });

    return () => sub.remove();
  }, [player]);


  useFocusEffect(
    useCallback(() => {
        try {
          player.play();
        } catch (error) {
          console.log(error);
        }
      return () => {
        try {
          player.pause();
        } catch (error) {
          console.log(error);
        }
      };
    }, [player])
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      <View style={{ position: "absolute", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", top: insets.top, paddingLeft: 16, paddingRight: 16, zIndex: 10000 }}>
        <Image source={require("@/assets/images/logo.png")} style={{ left: 0, width: 40, height: 40, resizeMode: "contain" }} />
        <View style={{ right: 0 }} >
          <Button buttonStyle="icon" icon={<BellIcon width={30} height={30} fill={theme.textLight} />} />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>

        {/* Hero */}
        <View style={{ height: 375, width: "100%", marginBottom: 16 }}>
          <VideoView
            player={player}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 375 }}
            contentFit="cover"
            nativeControls={false}
            
          />


          <View
            style={{
              flex: 1, paddingTop: insets.top, justifyContent: "center", alignItems: "center",
            }}>

            <Image
              source={require("@/assets/images/logo.png")}
              style={{ width: 173, height: 173, resizeMode: "contain", marginBottom: 15 }}
            />

            <Text style={[Typography.Body1, { color: Palette.white, width: "100%", textAlign: "center" }]}>See you at Summer Well 2026 in about:</Text>
            <Text style={[Typography.Header1, { color: Palette.yellow, overflow: "visible", width: "100%", textAlign: "center", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 8 }]}>256:45:43:29</Text>
          </View>
        </View>

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <Text style={[Typography.Header2, { color: theme.textDark, marginLeft: 16 }]}>Meet the artists:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }} contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}>

            <Artist name="Charli XCX" image="https://www.atlanticrecords.com/sites/g/files/g2000015596/files/styles/artist_image_detail/public/2024-06/Charli%20XCX%20Main%20Press%20Photo%20_Credit_Harley%20Weir_0.jpg?itok=So3jfGNt" />
            <Artist name="Chappell Roan" image="https://media.pitchfork.com/photos/64ff1676931354660ba71d8b/1:1/w_4358,h_4358,c_limit/Chappell-Roan-Princess.jpg" />
            <Artist name="Fontaines D.C." image="https://i.scdn.co/image/ab67616100005174c4b9cd69cf77ce41487dd69a" />

          </ScrollView>
        </View>

      </ScrollView>

      {/* fixed footer */}
      <View style={{ paddingBottom: 8 }}>
        <Button title="GET TICKETS BEFORE WE'RE OUT!" buttonStyle="important" onPress={() => {
          router.push("/wallet")
          setTimeout(() => {
            router.push("/wallet/tickets");
          }, 0);
        }}></Button>
      </View>

    </View>
  );
}