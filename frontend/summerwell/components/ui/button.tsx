import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";


type Props = {
    buttonStyle: "auth_3rdparty" | "auth_credentials" | "icon" | "important" | "secondary" | "primary";
    title?: string | undefined;
    icon?: React.ReactNode | undefined;
    onPress?: () => void;
};

export default function Button({ buttonStyle, title, icon, onPress }: Props) {
    const theme = Colors[useColorScheme() ?? "light"];


    if (buttonStyle === "auth_3rdparty") {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{backgroundColor: theme.buttonAuth, justifyContent: "center", alignItems: "center", borderRadius: 100, flexDirection: "row", paddingVertical: 12, paddingHorizontal: 16, gap:13}}activeOpacity={0.85}>
            {icon ? icon : null}
            <Text style={[Typography.Button, { textAlign: "center", color: theme.buttonTextLight }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
    } else if (buttonStyle === "auth_credentials") {
    return (
        <TouchableOpacity
            onPress={onPress}
           style={{backgroundColor: theme.buttonAuthCred, justifyContent: "center", alignItems: "center", borderRadius: 100, flexDirection: "row", paddingVertical: 12, paddingHorizontal: 16, gap:13}}activeOpacity={0.85}>
            <Text style={[Typography.Button, { textAlign: "center", color: theme.buttonTextDark }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
    } else if (buttonStyle === "icon") {
    return (
        <TouchableOpacity
            onPress={onPress}
           style={{justifyContent: "center", alignItems: "center", borderRadius: 100, padding: 0}} activeOpacity={0.85}>
            {icon ? icon : null}
        </TouchableOpacity>
    );
    } else if (buttonStyle === "important"){
        return (
        <TouchableOpacity
           onPress={onPress}
           style={{backgroundColor: theme.button1, justifyContent: "center", alignItems: "center", flexDirection: "row", paddingVertical: 12, paddingHorizontal: 16, gap:13, height: 60}}activeOpacity={0.85}>
            <Text style={[Typography.Button, { textAlign: "center", color: theme.buttonTextLight }]}>
                {title}
            </Text>
        </TouchableOpacity>
        )
    } else if (buttonStyle === "secondary"){
        return (
        <TouchableOpacity
            onPress={onPress}
            style={{backgroundColor: Palette.blue, justifyContent: "center", alignItems: "center", borderRadius: 100, flexDirection: "row", paddingVertical: 10, paddingHorizontal: 30}} activeOpacity={0.85}>
            <Text style={[Typography.Button, { textAlign: "center", color: theme.buttonTextLight }]}>
                {title}
            </Text>
        </TouchableOpacity>
            )
    }   else if (buttonStyle === "primary"){
        return (
        <TouchableOpacity
            onPress={onPress}
            style={{backgroundColor: Palette.orange, justifyContent: "center", alignItems: "center", borderRadius: 100, flexDirection: "row", paddingVertical: 8, paddingHorizontal: 30}} activeOpacity={0.85}>
            <Text style={[Typography.Button, { textAlign: "center", color: theme.buttonTextLight }]}>
                {title}
            </Text>
        </TouchableOpacity>
            )
    }
}