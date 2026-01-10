import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Typography } from "@/constants/typography";
import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import ChevronLeftIcon from "@/assets/icons/icon_chevron-left.svg";
import Header from "@/components/ui/header";
import { useAuth } from "@/context/AuthContext";

export default function PinScreen() {
    const theme = Colors[useColorScheme() ?? "light"];
    const router = useRouter();
    const auth = useAuth();
    const params = useLocalSearchParams();
    const email = params.email as string;

    const [pin, setPin] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header left={<TouchableOpacity onPress={router.back}><ChevronLeftIcon width={32} height={32} fill={Palette.white} /></TouchableOpacity>} title="Verification" backgroundColor={theme.header} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
                    <View style={{ gap: 20, marginTop: 10 }}>
                        <View style={{ gap: 8 }}>
                            <Text style={[Typography.Header3, { color: theme.textDark }]}> Enter verification code </Text>
                            <Text style={[Typography.Body2, { color: theme.textDark, opacity: 0.7 }]}> We have sent a code to {email}. </Text>
                        </View>
                        <View style={{ position: 'relative' }}>
                            <Input value={pin} onChangeText={setPin} keyboardType="number-pad" textContentType="oneTimeCode" autoFocus={true} caretHidden={true} maxLength={6} />
                        </View>
                    </View>

                    <View style={{ marginBottom: 16 }}>
                        <Button buttonStyle="primary" title="Verify" onPress={async () => {
                            const response = await auth.verifyPin(email, pin);
                            if(response) {
                                router.replace('/(tabs)/home');
                            }

                        }} />
                    </View>

                </View>

            </KeyboardAvoidingView>
        </View>
    );
}