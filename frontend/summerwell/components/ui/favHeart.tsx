import React, { useState, useEffect } from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import * as Haptics from "expo-haptics";
import { Palette } from "@/constants/theme";

import HeartFilledIcon from "@/assets/icons/icon_heart_filled.svg";
import HeartIcon from "@/assets/icons/icon_heart.svg";

interface FavHeartProps {
    favorite?: boolean;
    iconScale?: number;
    onToggle?: (newState: boolean) => void;
}

export default function FavHeart({ favorite = false, iconScale = 30, onToggle }: FavHeartProps) {
    const [isLiked, setIsLiked] = useState(favorite);

    const scale = useSharedValue(1);

    useEffect(() => {
        setIsLiked(favorite);
    }, [favorite]);

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
        const newState = !isLiked;

        setIsLiked(newState);
        if (onToggle) onToggle(newState);

        scale.value = withTiming(1, { duration: 100 });

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const handlePressOut = () => {
        scale.value = withTiming(1, { duration: 100 });
    };

    return (
        <Pressable onPressIn={handlePressIn} onPress={handlePress} onPressOut={handlePressOut} style={{ width: iconScale, height: iconScale, justifyContent: "center", alignItems: "center" }}>
            <Animated.View style={[animatedStyle, { shadowColor: Palette.black, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 3, justifyContent: 'center', alignItems: 'center'}]}>
                {isLiked ? (
                    <HeartFilledIcon fill={Palette.pink} width={iconScale} height={iconScale} />
                ) : (
                    <HeartIcon fill={Palette.white} width={iconScale} height={iconScale} />
                )}
            </Animated.View>
        </Pressable>
    );
}