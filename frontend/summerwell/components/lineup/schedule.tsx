import { View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Pressable } from "react-native";
import { Typography } from "@/constants/typography";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Palette } from "@/constants/theme";
import Artist from "@/components/ui/artist";
import React, { useRef, useState } from "react";
import Button from "../ui/button";

const hour_width = 250;
const row_height = 120;
const start_hour = 18;
const header_height = 40;

const timeLabels = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00"];

const getTime = (time: string) => {
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
  const width = (endTime - startTime) * hour_width +1;

  return { left, width };
};

export default function Schedule() {
  const theme = Colors[useColorScheme() ?? "light"];
  
  const headerScrollRef = useRef<ScrollView>(null);
  const bodyScrollRef = useRef<ScrollView>(null);

  const stages = [
    { name: "Orange Main Stage", color: Palette.orange },
    { name: "ING Sunset Stage", color: Palette.yellow },
  ];

  const artists = [
    {
      id: "1",
      name: "Clairo",
      image: "https://cdn-images.dzcdn.net/images/cover/6dfa4ea965a74b93870a85daa74b7ca3/0x1900-000000-80-0-0.jpg",
      stage: "Orange Main Stage",
      start: "18:30",
      end: "19:45"
    },
    {
      id: "2",
      name: "Chappell Roan",
      image: "https://media.pitchfork.com/photos/64ff1676931354660ba71d8b/1:1/w_4358,h_4358,c_limit/Chappell-Roan-Princess.jpg",
      stage: "Orange Main Stage",
      start: "20:30",
      end: "21:30"
    },
    {
      id: "3",
      name: "Fontaines D.C.",
      image: "https://i.scdn.co/image/ab67616100005174c4b9cd69cf77ce41487dd69a",
      stage: "ING Sunset Stage",
      start: "19:00",
      end: "20:15"
    }
  ];

    const [activeTab, setActiveTab] = useState<"Friday" | "Saturday" | "Sunday">("Friday");

  const gridWidth = timeLabels.length * hour_width;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollTo({ x, animated: false });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {/* SUBHEADER */}
      <View style={{ backgroundColor: theme.subheader, height: 45, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 30, zIndex: 10 }}>
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

      <View style={{ flex: 1 }}>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} stickyHeaderIndices={[0]} >




          {/* TIME LABELS */}
          <View style={{ backgroundColor: theme.background, zIndex: 100 }}>
             <ScrollView horizontal ref={headerScrollRef} scrollEnabled={false}showsHorizontalScrollIndicator={false}>
                <View style={{ width: gridWidth, height: header_height, flexDirection: "row", marginLeft: 16 }}>
                  {timeLabels.map((label) => (
                    <View key={label} style={{ position: "relative", width: hour_width }}>
                      <Text style={[Typography.Body1, { color: theme.textDark, marginTop: 10 }]}>{label}</Text>
                    </View>
                  ))}
                  <View style={{ width: "110%", height: 2, backgroundColor: theme.devider1, position: "absolute", bottom: 0, left: -16 }} />
                </View>
             </ScrollView>
          </View>


          <View style={{ minHeight: '100%', position: 'relative' }}>

              <ScrollView horizontal ref={bodyScrollRef} onScroll={handleScroll} scrollEventThrottle={16} contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={{ width: gridWidth, minHeight: '100%' }}>
                      



                      {/* GRID */}
                      <View style={{ position: 'absolute', top: 0, left: 16, flexDirection: 'row', height: '100%' }}>
                        {timeLabels.map((label, index) => {
                          const isLastItem = index === timeLabels.length - 1;
                          return (
                            <View key={label} style={{ width: hour_width, height: '100%' }}>
                              <View style={{ height: "100%", width: 2, backgroundColor: theme.devider1, position: "absolute", left: 16 }} />
                              {!isLastItem && (
                                <View style={{ height: "100%", width: 2, backgroundColor: theme.devider1_50, position: "absolute", left: hour_width / 2 + 16 }} />
                              )}
                            </View>
                          )
                        })}
                      </View>




                      {/* ARTISTS */}
                      {artists.map((artist) => {
                        const position = getPosition(artist.start, artist.end);
                        const stageIndex = stages.findIndex(s => s.name === artist.stage);

                        if (stageIndex === -1) return null;

                        return (
                          <View key={artist.id} style={{ position: "absolute", width: position.width, top: 45 + (stageIndex * row_height), left: position.left + 16, zIndex: 2 }}>
                            <Artist schedule={true} name={artist.name} image={artist.image} time={`${artist.start}-${artist.end}`} />
                          </View>
                        );
                      })}
                  </View>
              </ScrollView>




              {/* STAGES */}
              <View pointerEvents="none" style={{ position: "absolute", top: 10, left: 16, bottom: 0, width: '100%' }}>
                {stages.map((stage, index) => (
                  <View key={stage.name} style={{ position: 'absolute', top: index * row_height }}>
                    <Text style={[Typography.Header3, { color: stage.color, backgroundColor: theme.background }]}>
                      {stage.name}
                    </Text>
                  </View>
                ))}
              </View>

          </View>
        </ScrollView>

      <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button buttonStyle="secondary" title="MY LINE-UP" onPress={() => {}} />
      </View>

      </View>
    </View>
  );
}