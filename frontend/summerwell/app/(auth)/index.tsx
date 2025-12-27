import React, { useEffect } from "react";
import { View, Image, Text, AppState } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from "expo-video";


import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import Button from "@/components/ui/button";

import FacebookIcon from "@/assets/icons/icon_facebook.svg";
import GoogleIcon from "@/assets/icons/icon_google.svg";
import { useRouter } from "expo-router";




export default function AuthScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const player = useVideoPlayer(require("@/assets/videos/bg_video.mp4"), (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state: string) => {
      if (state === "active") {
        player.play();
      }
    });

    return () => sub.remove();
  }, [player]);


  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      <View style={{ height: "100%", width: "100%" }}>
        <VideoView
          player={player}
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%" }}
          contentFit="cover"
          nativeControls={false}
        />

          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 173, height: 173, resizeMode: "contain", marginTop: 150, alignSelf: "center", shadowColor: Palette.yellow, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 20, overflow: "visible" }}
          />

        <View style={{margin: 16, bottom: 50, position: "absolute"}}>
          <View style={{ backgroundColor: theme.background, paddingLeft: 20, paddingRight: 20, paddingTop: 30, paddingBottom: 30, alignItems: "center", borderRadius: 25, width: "100%"}}>
            <View style={{  marginBottom: 30 }}>
            <Text style={[Typography.Header2, { color: theme.textDark}]}>Authentificate:</Text>
            </View>
            <View style={{ gap: 12 }} >
              <Button buttonStyle="auth_3rdparty" title="Continue with Facebook" icon={<FacebookIcon fill={Palette.white} width={23} height={23} />} />
              <Button buttonStyle="auth_3rdparty" title="Continue with Google" icon={<GoogleIcon fill={Palette.white} width={23} height={23} />} />
              <Button buttonStyle="auth_credentials" title="Continue with Credentials" onPress={() => router.push('/login')} />
            </View>
          </View>
        </View>
      </View>


    </View>
  );
}