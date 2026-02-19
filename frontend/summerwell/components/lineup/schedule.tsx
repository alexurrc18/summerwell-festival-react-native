import { View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Pressable, RefreshControl, Animated } from "react-native";
import { Typography } from "@/constants/typography";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Palette } from "@/constants/theme";
import Artist from "@/components/ui/artist";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Button from "../ui/button";
import { useApiData } from "@/hooks/apiData";
import TimeIndicator from "@/components/ui/time-indicator";
import { useAuth } from "@/context/AuthContext";

type ArtistData = {
  id: number;
  name: string;
  image: string;
  stageName: string;
  actStart: string;
  actEnd: string;
  day: number;
};

type StageData = {
  id: number;
  name: string;
  color: string;
};


const hour_width = 250;
const row_height = 120;
const start_hour = 18;
const header_height = 40;
const last_col_width = 60;


const timeLabels = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00"];



const getTime = (time: string) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  if (hours < 17) {
    return hours + 24 + minutes / 60;
  } else {
    return hours + minutes / 60;
  }
};


const getPosition = (start: string, end: string) => {
  const startTime = getTime(start);
  const endTime = getTime(end);

  const left = (startTime - start_hour) * hour_width + 16;
  const width = (endTime - startTime) * hour_width + 1;

  return { left, width };
};


const getStartPosition = (start: string) => {
  const startTime = getTime(start);

  const left = (startTime - start_hour) * hour_width + 16;

  return { left };
};





export default function Schedule() {
  const theme = Colors[useColorScheme() ?? "light"];

  const scrollX = useRef(new Animated.Value(0)).current;
  const bodyScrollRef = useRef<ScrollView>(null);

  const [activeTab, setActiveTab] = useState<"Friday" | "Saturday" | "Sunday">("Friday");
  const [filteredArtists, setFilteredArtists] = useState<ArtistData[]>([]);
  const { localFavoriteArtists } = useAuth();

  const [filter, setFilter] = useState<"MY LINE-UP" | "FULL LINE-UP">("FULL LINE-UP");


  const { data: allArtists, onRefresh: refreshArtists, refreshing: refArtists } = useApiData<ArtistData[]>('/public/artists', 'cache_artists');
  const { data: stagesData, onRefresh: refreshStages, refreshing: refStages } = useApiData<StageData[]>('/public/stages', 'cache_stages');

  const stages = Array.isArray(stagesData) ? stagesData : [];

  const [currentTime, setCurrentTime] = useState<number>(0);



  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(getStartPosition(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`).left);
    }
    updateTime();
    const interval = setInterval(() => {
      updateTime();

    }, 60000);
    return () => clearInterval(interval);
  }, []);




  useEffect(() => {
    const list = Array.isArray(allArtists) ? allArtists : [];

    let targetDay = 1;
    if (activeTab === "Saturday") targetDay = 2;
    if (activeTab === "Sunday") targetDay = 3;

    if (filter === "MY LINE-UP") {
      setFilteredArtists(list.filter(artist => artist.day === targetDay && localFavoriteArtists.includes(Number(artist.id))));
    } else { 
      setFilteredArtists(list.filter(artist => artist.day === targetDay)); 
    }
  }, [activeTab, allArtists, filter, localFavoriteArtists]);

  const handleRefresh = useCallback(async () => {
    await Promise.all([refreshArtists(), refreshStages()]);
  }, [refreshArtists, refreshStages]);

  const gridWidth = (timeLabels.length - 1) * hour_width + last_col_width + 16;





  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {/* SUBHEADER TABS */}
      <View style={{ backgroundColor: theme.subheader, height: 45, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 30, zIndex: 10 }}>
        {(["Friday", "Saturday", "Sunday"] as const).map(tab => (
          <Pressable key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[Typography.Header3, { color: activeTab === tab ? theme.selected : Palette.white }]}>{tab}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1 }}>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          stickyHeaderIndices={[0]}
          overScrollMode="never"
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refArtists || refStages} onRefresh={handleRefresh} tintColor={theme.textDesc} />}>


          {/* TIME LABELS HEADER */}
          <View style={{ backgroundColor: theme.background, zIndex: 100, width: '100%', overflow: 'hidden' }}>
            <View style={{ width: '100%' }}>
              <Animated.View style={{
                width: gridWidth, height: header_height, flexDirection: "row", marginLeft: 16,
                transform: [{
                  translateX: scrollX.interpolate({
                    inputRange: [0, gridWidth],
                    outputRange: [0, -gridWidth],
                    extrapolate: 'clamp'
                  })
                }]
              }}>
                {timeLabels.map((label, index) => {
                  const isLastItem = index === timeLabels.length - 1;
                  const width = isLastItem ? last_col_width : hour_width;

                  return (
                    <View key={label} style={{ position: "relative", width: width }}>
                      <Text style={[Typography.Body1, { color: theme.textDark, marginTop: 10 }]}>{label}</Text>
                    </View>
                  );
                })}
                <View style={{ width: "100%", height: 2, backgroundColor: theme.devider1, position: "absolute", bottom: 0, left: -16 }} />

              </Animated.View>
            </View>
          </View>

          <View style={{ minHeight: '100%', position: 'relative' }}>

            <Animated.ScrollView horizontal ref={bodyScrollRef}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={1}
              contentContainerStyle={{ flexGrow: 1 }}
              overScrollMode="never"
              bounces={false}>
              <View style={{ width: gridWidth, minHeight: '100%' }}>

                {/* GRID LINES */}
                <View style={{ position: 'absolute', top: 0, left: 16, flexDirection: 'row', height: '100%' }}>
                  {timeLabels.map((label, index) => {
                    const isLastItem = index === timeLabels.length - 1;
                    const width = isLastItem ? last_col_width : hour_width;

                    return (
                      <View key={label} style={{ width: width, height: '100%' }}>
                        <View style={{ height: "100%", width: 2, backgroundColor: theme.devider1, position: "absolute", left: 16 }} />
                        {!isLastItem && (
                          <View style={{ height: "100%", width: 2, backgroundColor: theme.devider1_50, position: "absolute", left: hour_width / 2 + 16 }} />
                        )}
                      </View>
                    )
                  })}
                </View>

                {/* ARTISTS */}
                {filteredArtists.map((artist) => {
                  const position = getPosition(artist.actStart, artist.actEnd);
                  const stageIndex = stages.findIndex(s => s.name === artist.stageName);

                  if (stageIndex === -1) return null;

                  return (
                    <View key={artist.id} style={{ position: "absolute", width: position.width, top: 45 + (stageIndex * row_height), left: position.left + 16, zIndex: 2 }}>
                      <Artist
                        id={artist.id}
                        schedule={true}
                        name={artist.name}
                        image={artist.image}
                        time={`${artist.actStart}-${artist.actEnd}`}
                      />
                    </View>
                  );
                })}
              </View>
            </Animated.ScrollView>



            {/* STAGES COLUMN */}
            <View pointerEvents="none" style={{ position: "absolute", top: 10, left: 16, bottom: 0, width: '100%', zIndex: 10 }}>
              {stages.map((stage, index) => (
                <View key={stage.name} style={{ position: 'absolute', top: index * row_height }}>
                  <Text style={[Typography.Header3, { color: Palette[stage.color as keyof typeof Palette] || Palette.white, backgroundColor: theme.background }]}>
                    {stage.name}
                  </Text>
                </View>
              ))}
            </View>



          </View>

          {/* TIME INDICATOR */}
          {currentTime > 5 &&
            <Animated.View pointerEvents="none" style={{
              position: 'absolute', top: 10, bottom: 0, left: 0, width: gridWidth, zIndex: 9999,
              transform: [{
                translateX: scrollX.interpolate({
                  inputRange: [0, gridWidth],
                  outputRange: [0, -gridWidth],
                  extrapolate: 'clamp'
                })
              }]
            }}>
              <TimeIndicator position={currentTime + 16} />
            </Animated.View>
          }

        </ScrollView>

        <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
          <Button variant="secondary" title={filter === "FULL LINE-UP" ? "MY LINE-UP" : "FULL LINE-UP"} onPress={() => { 
            setFilter(filter === "FULL LINE-UP" ? "MY LINE-UP" : "FULL LINE-UP");
             }} />
        </View>

      </View>
    </View>
  );
}