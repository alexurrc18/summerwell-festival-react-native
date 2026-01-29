import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { View, Image, Text, ScrollView, AppState, Animated, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from "expo-video";
import { useFocusEffect, useRouter } from "expo-router";

import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Button from "@/components/ui/button";
import Artist from "@/components/ui/artist";
import BellIcon from "@/assets/icons/icon_bell.svg";
import Header from "@/components/ui/header";

import { useApiData } from "@/hooks/apiData";


type AppSettingsData = {
  id: number;
  option_name: string;
  value: string;
};

type ArtistData = {
  id: number;
  name: string;
  image: string;
  priority?: number;
  description: string;
  urlInstagram: string;
  urlSpotify: string;
};


const formatTime = (targetTime: number) => {
  const now = Date.now();
  const difference = targetTime - now;

  if (difference <= 0) return "See you there!";

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const pad = (n: number) => (n < 10 ? `0${n}` : n);

  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};


export default function HomeScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const insets = useSafeAreaInsets();

  const router = useRouter();

  // fetching app settings from cache
  const { data: settings } = useApiData<AppSettingsData[]>('/public/app_settings', 'cache_app_settings');
  const { data: artists } = useApiData<ArtistData[]>('/public/artists', 'cache_artists');

  const artistsData = Array.isArray(artists) ? artists : [];


  // countdown timer
  const [timeLeft, setTimeLeft] = useState("SOON!");

  useEffect(() => {
    const dateSetting = settings?.find(setting => setting.option_name === 'dateStart');

    if (!dateSetting) return;
    const targetTime = new Date(dateSetting.value).getTime();

    if (isNaN(targetTime)) {
      console.warn("ERROR: Invalid data set in database app_settings: ", dateSetting.value);
      return;
    }

    setTimeLeft(formatTime(targetTime));

    const interval = setInterval(() => {
      setTimeLeft(formatTime(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [settings]);



  // player stuff
  const player = useVideoPlayer(require("@/assets/videos/bg_video.mp4"), (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

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

  const isHeaderVisible = useRef(false);

  const headerAnim = useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", theme.subheader],
  });

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const threshold = 250;

    if (scrollY > threshold && !isHeaderVisible.current) {
      isHeaderVisible.current = true;
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (scrollY <= threshold && isHeaderVisible.current) {
      isHeaderVisible.current = false;
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      <Animated.View style={{ backgroundColor: headerBackgroundColor, position: "absolute", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingTop: insets.top, paddingLeft: 16, paddingRight: 16, paddingBottom: 5, zIndex: 10000 }}>
        <Image source={require("@/assets/images/logo.png")} style={{ left: 0, width: 40, height: 40, resizeMode: "contain" }} />
        <View style={{ right: 0 }} >
          <Button variant="icon" icon={<BellIcon width={30} height={30} fill={Palette.white} onPress={() => router.push("/home/notifications")} />} />
        </View>
      </Animated.View>

      <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={16}>

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
            <Text style={[Typography.Header1, { color: Palette.yellow, overflow: "visible", width: "100%", textAlign: "center", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 8 }]}>{timeLeft}</Text>
          </View>
        </View>

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <Text style={[Typography.Header2, { color: theme.textDark, marginLeft: 16 }]}>Meet the artists:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }} contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}>

            {artistsData?.filter(artist => artist.priority !== null)?.sort((a, b) => {
              const prA = a.priority ?? 9999;
              const prB = b.priority ?? 9999;
              return prA - prB;
            }).map((artist) => {
              return (
                <Artist
                  key={artist.id}
                  id={artist.id}
                  name={artist.name}
                  image={artist.image}
                  description={artist.description}
                  urlInstagram={artist.urlInstagram}
                  urlSpotify={artist.urlSpotify}
                />
              );
            })}

            <Pressable onPress={() => router.push("/lineup")} >
              <Artist placeholder={true} name="...and many more!" />
            </Pressable>


          </ScrollView>

        </View>

      </ScrollView>

      {/* fixed footer */}
      <View style={{ paddingBottom: 8 }}>
        <Button title="GET TICKETS BEFORE WE'RE OUT!" variant="banner" onPress={() => {
          router.push("/wallet")
          setTimeout(() => {
            router.push("/wallet/tickets");
          }, 0);
        }}></Button>
      </View>

    </View>
  );
}
