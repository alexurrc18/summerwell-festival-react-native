import { View, Text, PlatformColor } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';

import { Typography } from "@/constants/typography";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Palette } from "@/constants/theme";

import HeartIcon from "@/assets/icons/icon_heart.svg";
import HeartFilledIcon from "@/assets/icons/icon_heart_filled.svg";

type Props = {
    name: string;
    image: string;
};


export default function artist({ name, image }: Props) {
    const theme = Colors[useColorScheme() ?? "light"];

    return (
        <View style={{ width: 177, height: 177}}>
            <Image source={{ uri: image }} contentFit="cover" style={{ width: "100%", height: "100%" }} />

            <LinearGradient
                colors={['transparent', Palette.black]}
                style={{ position: 'absolute', width: '100%', height: '100%', left: 0, right: 0, bottom: 0, opacity: 0.3}}
            />

            <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <HeartIcon style={{ position: 'absolute', right: 5, top: 5, shadowColor: Palette.black, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 2, overflow: "visible" }} fill={Palette.white} width={30} height={30}/>
                <Text style={[Typography.Header2, { color: theme.artistText, position: 'absolute', bottom: 0, left: 0, paddingLeft: 5, paddingRight: 5, width: "100%" }]}>{name}</Text>
            </View>
        </View>
    )

}