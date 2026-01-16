import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Typography } from "@/constants/typography";
import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import ChevronLeftIcon from "@/assets/icons/icon_chevron-left.svg";
import Header from "@/components/ui/header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
    const theme = Colors[useColorScheme() ?? "light"];
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const { signIn } = useAuth();

    const [email, setEmail] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header left={<TouchableOpacity onPress={router.back}><ChevronLeftIcon width={32} height={32} fill={Palette.white} /></TouchableOpacity>} title="Log in" backgroundColor={theme.header} />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >

                <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>

                    <View style={{ gap: 12, marginTop: 10 }}>
                        <Text style={[Typography.Header3, { color: theme.textDark }]}>
                            What's your email address?
                        </Text>

                        <Input value={email} onChangeText={setEmail} placeholder="E-Mail" autoFocus={true} spellCheck={false} textContentType="emailAddress" inputMode="email" autoCapitalize="none" keyboardType="email-address" autoCorrect={false} />

                        <Text style={[Typography.Body2, { color: theme.textDark, opacity: 0.7 }]}>
                            We will send a 6 number PIN to your email address that you can use to login.
                        </Text>
                    </View>

                    <View style={{ marginBottom: 16 }}>
                        <Button buttonStyle="secondary" title="Continue" onPress={async () => {
                            const success = await signIn(email);
                            if (success) { 
                                router.push({ pathname: '/(auth)/pin', params: { email } }); 
                            } else {
                                
                            }
                        }} />
                    </View>

                </View>

            </KeyboardAvoidingView>
        </View>
    );
}
