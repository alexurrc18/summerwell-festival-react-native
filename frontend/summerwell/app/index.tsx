import { Redirect, router } from "expo-router";
import React, { use, useEffect } from "react";
import { useColorScheme, View } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/theme";

import { useApiData } from "@/hooks/apiData";


export default function SplashScreen() {
  const theme = Colors[useColorScheme() ?? "light"];

  const { loading: loadingArtists } = useApiData('/public/artists', 'cache_artists');
  const { loading: loadingStages } = useApiData('/public/stages', 'cache_stages');

  useEffect(() => {
    if (!loadingArtists && !loadingStages) {
      router.replace("/(tabs)/home");
    } else {
        const timeout = setTimeout(() => {
          router.replace("/(tabs)/home");
        }, 5000);

        clearTimeout(timeout);
      }
  }, [loadingArtists, loadingStages]);


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
      <Image
        source={require("@/assets/images/splash-screen.png")}
        contentFit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}