// app/login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Importăm routerul
import { Typography } from "@/constants/typography";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Button from "@/components/ui/button";
import ChevronLeftIcon from "@/assets/icons/icon_chevron-left.svg";

export default function LoginScreen() {
    const theme = Colors[useColorScheme() ?? "light"];
    const router = useRouter(); // Hook pentru navigare
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: theme.background, padding: 20, paddingTop: 60 }}>
            
            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 50 }}>
                <Text style={[Typography.Header2, { color: theme.textDark, width: "100%", textAlign: "center"}]}> Log In </Text>
                <View style={{ position: "absolute", left: 0 }}>
                    <Button buttonStyle="icon" icon={<ChevronLeftIcon width={32} height={32} fill={theme.textDark} />} onPress={() => router.back()} />
                </View>
            </View>
            
            {/* Form */}
            <View style={{ gap: 12, marginBottom: 30 }}>
                <TextInput 
                    placeholder="E-Mail" 
                    style={[Typography.Body1, { color: theme.textDark, borderWidth: 1, borderColor: theme.devider2, borderRadius: 10, padding: 15 }]} 
                    onChangeText={setEmail}
                />
                <TextInput 
                    placeholder="Password" 
                    secureTextEntry
                    style={[Typography.Body1, { color: theme.textDark, borderWidth: 1, borderColor: theme.devider2, borderRadius: 10, padding: 15 }]} 
                    onChangeText={setPassword}
                />
            </View>

            <Button buttonStyle="secondary" title="LOG IN" onPress={() => router.push('/(tabs)')} />

        </View>
    );
}