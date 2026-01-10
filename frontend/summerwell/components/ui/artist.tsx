import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';

import { Typography } from "@/constants/typography";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Palette } from "@/constants/theme";

import HeartIcon from "@/assets/icons/icon_heart.svg";
import FavHeart from "./favHeart";

type Props = {
    name: string;
    image: string;
    schedule?: boolean;
    time?: string;
    width?: number | string;
    favArtist?: boolean;
};


export default function Artist({ name, image, schedule = false, time = "TBA", width = 100, favArtist = false}: Props) {
    const theme = Colors[useColorScheme() ?? "light"];

    if (!schedule) {
        return (
            <View style={{ width: 177, height: 177 }}>
                <Image source={{ uri: image }} contentFit="cover" transition={250} style={{ width: "100%", height: "100%", backgroundColor: theme.devider1_50 }} />

                <LinearGradient
                    colors={['transparent', Palette.black]}
                    style={{ position: 'absolute', width: '100%', height: '100%', left: 0, right: 0, bottom: 0, opacity: 0.3 }}
                />
                <View style={{ position: 'absolute', top: 5, right: 5 }}>
                    <FavHeart favorite={favArtist} />
                </View>

                <View style={{ position: 'absolute', width: '100%', height: '100%' }}>

                    <Text style={[Typography.Header2, { color: theme.artistText, position: 'absolute', bottom: 0, left: 0, paddingLeft: 5, paddingRight: 5, width: "100%" }]}>{name}</Text>
                </View>
            </View>
        )
    } 
    
    else {
        return (
            <View style={{ width: "100%", height: 62, flexDirection: "row", alignItems: "center", borderRadius: 11, padding: 3, borderColor: theme.devider3, borderWidth: 2.5, backgroundColor: theme.background }}>
                <Image source={{ uri: image }} contentFit="cover" transition={250} style={{ width: 52, height: 52, borderRadius: 7, backgroundColor: theme.devider1_50 }} />

                <View style={{ flex: 1, justifyContent: "center", marginLeft: 10, marginRight: 35 }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[Typography.Header3, { color: theme.textDark }]}>
                        {name}
                    </Text>
                    <Text style={[Typography.Body2, { color: theme.textDark }]}>{time}</Text>
                </View>
                
                <View style={{ position: 'absolute', right: 10 }}>
                    <FavHeart favorite={favArtist} iconScale={25} />
                </View>
            </View>
        )
    }
}