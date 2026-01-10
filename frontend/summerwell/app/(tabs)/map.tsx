import { View, Text, ScrollView } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import React, { useState, useLayoutEffect, useCallback, useRef } from "react";

import { useFocusEffect, useNavigation } from "expo-router";

import Button from "@/components/ui/button";
import FilterIcon from "@/assets/icons/icon_filter.svg";
import Header from "@/components/ui/header";
import { useApiData } from "@/hooks/apiData";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";



import FirstAidPin from '@/assets/map_pins/pin_first_aid.svg';
import BarPin from '@/assets/map_pins/pin_bar.svg';
import BusPin from '@/assets/map_pins/pin_bus.svg';
import FoodPin from '@/assets/map_pins/pin_food.svg';
import StagePin from '@/assets/map_pins/pin_stage.svg';
import ToiletsPin from '@/assets/map_pins/pin_toilets.svg';
import TopUpPin from '@/assets/map_pins/pin_top_up.svg';
import ExperiencePin from '@/assets/map_pins/pin_experience.svg';
import { useMapStyle } from "@/constants/map-style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WristbandPin from "@/assets/map_pins/pin_wristband.svg";



type MapPin = {
  id: number;
  category: string;
  id_category: number;
  lon: number;
  lat: number;
}


export default function MapScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Filter state
  const [isFilterVisible, setFilterVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header title="Map" backgroundColor={theme.header} right={
          <Button buttonStyle="icon" onPress={() => setFilterVisible((prev) => !prev)}
            icon={<FilterIcon fill={isFilterVisible ? theme.selected : Palette.white} width={30} height={30} />} />
        } />
      ),
    });
  }, [navigation, isFilterVisible, theme]);


  const items = ["All", "Stages", "Top-up", "Experiences", "First Aid", "Food & drinks", "Toilets"];
  const [selectedFilter, setSelectedFilter] = useState("All");


  // map
  const { data: mapPins } = useApiData<MapPin[]>('/public/map', 'cache_map_pins');

  const mapRef = useRef<MapView>(null);

  useFocusEffect(
    useCallback(() => {
      mapRef.current?.animateToRegion({
        latitude: 44.56612495423416,
        longitude: 25.939762546422525,
        latitudeDelta: 0.0065,
        longitudeDelta: 0.008,
      }, 0);
    }, [])
  );


  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {isFilterVisible &&
        (<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: theme.subheader, flexGrow: 0, height: 47, zIndex: 1 }} contentContainerStyle={{ alignItems: "center", gap: 20, paddingHorizontal: 20 }}>
          {items.map((item, index) => (
            <Text key={index} style={[Typography.Header3, { color: selectedFilter === item ? theme.selected : Palette.white }]} onPress={() => setSelectedFilter(item)}>
              {item}
            </Text>
          ))}
        </ScrollView>)
      }



      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={useMapStyle()}
        style={{ position: 'absolute', flex: 1, top: 0, bottom: 0, left: 0, right: 0, zIndex: 0 }}>

        {mapPins?.map(pin => {
          switch (selectedFilter) {
            case "All":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "stage" && <StagePin width={40} height={40} />}
                  {pin.category === "food" && <FoodPin width={40} height={40} />}
                  {pin.category === "bar" && <BarPin width={40} height={40} />}
                  {pin.category === "toilets" && <ToiletsPin width={40} height={40} />}
                  {pin.category === "first-aid" && <FirstAidPin width={40} height={40} />}
                  {pin.category === "top-up" && <TopUpPin width={40} height={40} />}
                  {pin.category === "experience" && <ExperiencePin width={40} height={40} />}
                  {pin.category === "bus" && <BusPin width={40} height={40} />}
                  {pin.category === "access" && <WristbandPin width={40} height={40} />}
                </Marker>
              );
              break;
            case "Stages":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "stage" && <StagePin width={40} height={40} />}
                </Marker>);
              break;
            case "Top-up":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "top-up" && <TopUpPin width={40} height={40} />}
                </Marker>);
              break;
            case "Experiences":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "experience" && <ExperiencePin width={40} height={40} />}
                </Marker>);
              break;
            case "First Aid":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "first-aid" && <FirstAidPin width={40} height={40} />}
                </Marker>);
              break;
            case "Food & drinks":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "food" && <FoodPin width={40} height={40} />}
                  {pin.category === "bar" && <BarPin width={40} height={40} />}
                </Marker>);
              break;
            case "Toilets":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "toilets" && <ToiletsPin width={40} height={40} />}
                </Marker>);
              break;
            case "Access":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "access" && <WristbandPin width={40} height={40} />}
                </Marker>);
              break;
            case "Bus":
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "bus" && <BusPin width={40} height={40} />}
                </Marker>);
              break;
            default:
              return (
                <Marker key={pin.id} coordinate={{ latitude: pin.lat, longitude: pin.lon }}>
                  {pin.category === "stage" && <StagePin width={40} height={40} />}
                  {pin.category === "food" && <FoodPin width={40} height={40} />}
                  {pin.category === "bar" && <BarPin width={40} height={40} />}
                  {pin.category === "toilets" && <ToiletsPin width={40} height={40} />}
                  {pin.category === "first-aid" && <FirstAidPin width={40} height={40} />}
                  {pin.category === "top-up" && <TopUpPin width={40} height={40} />}
                  {pin.category === "experience" && <ExperiencePin width={40} height={40} />}
                  {pin.category === "bus" && <BusPin width={40} height={40} />}
                  {pin.category === "access" && <WristbandPin width={40} height={40} />}
                </Marker>
              );
              break;
          }
        })}

      </MapView>

    </View>
  );
}
