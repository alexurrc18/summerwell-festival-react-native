import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Palette } from "@/constants/theme";
import { Typography } from "@/constants/typography";

type Props = {
    title: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
    backgroundColor?: string;
};

export default function Header({title, left, right, backgroundColor = Palette.black}: Props) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{ backgroundColor: backgroundColor, height: 55 + insets.top, paddingTop: insets.top, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, }}>

            <View style={{ width: 40, alignItems: 'flex-start' }}>
                {left}
            </View>

            <Text numberOfLines={1} style={[Typography.Header2, { color: Palette.white, textAlign: "center", flex: 1 }]}>
                {title}
            </Text>

            <View style={{ width: 40, alignItems: 'flex-end' }}>
                {right}
            </View>
        </View>
    );
}