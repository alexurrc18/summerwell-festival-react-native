import React, { useState, useEffect } from "react";
import { Pressable, useColorScheme} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as Haptics from "expo-haptics";
import { Colors, Palette } from "@/constants/theme";

import HeartFilledIcon from "@/assets/icons/icon_heart_filled.svg";
import HeartIcon from "@/assets/icons/icon_heart.svg";
import { useAuth } from "@/context/AuthContext";

interface FavHeartProps {
    id: number;
    iconScale?: number;
    scheduleStyle?: boolean;
}

export default function FavHeart({ id, iconScale = 30, scheduleStyle = false }: FavHeartProps) {
    const { toggleFavoriteArtist, localFavoriteArtists } = useAuth();
    const scale = useSharedValue(1);
    const theme = Colors[useColorScheme() ?? "light"];
    const [isFavorite, setIsFavorite] = useState<boolean>(localFavoriteArtists.includes(Number(id)));

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        scale.value = withTiming(0.8, { duration: 100 });
    };

    const handlePress = () => {
        toggleFavoriteArtist(Number(id));
        setIsFavorite(!isFavorite);

        scale.value = withTiming(1, { duration: 100 });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const handlePressOut = () => {
        scale.value = withTiming(1, { duration: 100 });
    };

    return (
        <Pressable onPressIn={handlePressIn} onPress={handlePress} onPressOut={handlePressOut} style={{ width: iconScale, height: iconScale, justifyContent: "center", alignItems: "center" }}>
            {scheduleStyle ? (
                <Animated.View style={[animatedStyle, { shadowColor: Palette.black, shadowOffset: { width: 0, height: 0 },justifyContent: 'center', alignItems: 'center' }]}>
                    {isFavorite ? (
                        <HeartFilledIcon fill={Palette.pink} width={iconScale} height={iconScale} />
                    ) : (
                        <HeartIcon fill={theme.textDark} width={iconScale} height={iconScale} />
                    )}
                </Animated.View>
            ) : (
                <Animated.View style={[animatedStyle, { shadowColor: Palette.black, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, justifyContent: 'center', alignItems: 'center' }]}>
                    {isFavorite ? (
                        <HeartFilledIcon fill={Palette.pink} width={iconScale} height={iconScale} />
                    ) : (
                        <HeartIcon fill={Palette.white} width={iconScale} height={iconScale} />
                    )}
                </Animated.View>
            )}
        </Pressable>
    );
}