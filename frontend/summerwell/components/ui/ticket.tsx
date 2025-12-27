import { View, Text } from "react-native";
import { Image } from "expo-image";
import React, { useState } from "react";

import { Typography } from "@/constants/typography";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Palette } from "@/constants/theme";
import Button from "./button";

import PlusIcon from "@/assets/icons/icon_plus.svg";
import ChevronIcon from "@/assets/icons/icon_chevron-left.svg";
import QRCode from 'react-native-qrcode-svg';


type Props = {
    type: "cart" | "wallet";
    name: string;
    description: string;
    color?: string;
    price?: string;
    holder?: string;
    ticketID?: string;
    wristbandID?: string;
    balance?: string;
    inCart?: boolean;
};


export default function Ticket({ type, name, description, color, price, holder, ticketID, wristbandID = "Not claimed", balance = "0.00" }: Props) {
    const theme = Colors[useColorScheme() ?? "light"];
    const [expanded, setExpanded] = useState(false);

    if (type === "cart") {
        return (

            <View style={{ width: '100%', flexDirection: "row", height: 80 }}>

                {/* TICKET IMAGE */}
                <View style={{ backgroundColor: color, justifyContent: "center", paddingHorizontal: 15, alignItems: "center", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
                    <Image source={require("@/assets/images/logo.png")} style={{ width: 32, height: 32 }} contentFit="contain" />
                </View>

                {/* INFO */}
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, borderColor: theme.devider1, borderTopWidth: 2.5, borderBottomWidth: 2.5, backgroundColor: theme.background }}>

                    <View style={{ flex: 1, paddingRight: 8, justifyContent: 'center' }}>
                        <Text style={[Typography.Header3, { color: theme.textDark }]} numberOfLines={2} >
                            {name}
                        </Text>
                        <Text style={[Typography.Body2, { color: theme.devider2 }]} numberOfLines={1}>
                            {description}
                        </Text>
                    </View>

                    <View style={{ alignItems: "flex-end", minWidth: 60 }}>
                        <Text style={[Typography.Header3, { color: theme.textDark }]}>{price}</Text>
                        <Text style={[Typography.Body2, { color: theme.devider2 }]}>+8% fee</Text>
                    </View>
                </View>

                {/* BUTTON */}
                <View style={{ backgroundColor: Palette.orange, width: 50, justifyContent: "center", alignItems: "center", borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>

                    <Button buttonStyle="icon" icon={<PlusIcon fill={Palette.white} width={12} height={12} />} />
                </View>
            </View>
        )
    }

    else if (type === "wallet") {
        return (
            <View style={{ width: '100%' }}>

                {/* HEADER */}
                <View style={{flexDirection: "row", height: 60, backgroundColor: theme.background }}>

                    {/* TICKET IMAGE */}
                    <View style={{ width: 60, backgroundColor: color, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 20, borderBottomLeftRadius: expanded ? 0 : 20 }}>
                        <Image source={require("@/assets/images/logo.png")} style={{ width: 32, height: 32 }} contentFit="contain" />
                    </View>

                    {/* TICKET TYPE & EXPAND BUTTON */}
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 15, backgroundColor: theme.background, borderTopWidth: 2.5, borderBottomWidth: 2.5, borderRightWidth: 2.5, borderColor: theme.devider1, borderTopRightRadius: 20, borderBottomRightRadius: expanded ? 0 : 20 }}>
                        
                        
                        <Text style={[Typography.Header3, { color: theme.textDark, flex: 1 }]}>
                            {name}
                        </Text>


                        <View style={{ width: 50, height: '100%', justifyContent: "center", alignItems: "center", borderLeftWidth: 2.5, borderStyle: "dashed", borderColor: theme.devider1 }}>
                            <Button buttonStyle="icon" onPress={() => setExpanded(!expanded)} icon={<ChevronIcon fill={theme.textDark} style={{ transform: [{ rotate: expanded ? '90deg' : '-90deg' }] }} width={32} height={32} />} />
                        </View>

                    </View>
                </View>

                {/* INFO */}
                {expanded && (
                    <View style={{ padding: 20, alignItems: "center", gap: 20, borderLeftWidth: 2.5, borderRightWidth: 2.5, borderBottomWidth: 2.5, borderTopWidth: 0, borderColor: theme.devider1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>

                        {/* TICKET HOLDER */}
                        <Text style={[Typography.Header3, { color: theme.textDark }]}>{holder}</Text>

                        <View style={{ flexDirection: "column", justifyContent: "center", gap: 10, alignItems: "center" }}>
                            <View style={{ width: 150, backgroundColor: 'white', borderRadius: 10, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 10 }}>
                                <QRCode value={ticketID} size={130} />
                                <Text style={[Typography.Body2, { color: Palette.black, }]}>{ticketID}</Text>
                            </View>
                    
                            <Text style={[Typography.Body2, { color: theme.textDark }]}>
                                Wristband: {wristbandID}
                            </Text>
                        </View>

                        <View style={{ width: '100%', flexDirection: "column", justifyContent: "center", gap: 5, alignItems: "center" }}>
                            <Text style={[Typography.Header3, { color: theme.textDark, textAlign: 'center' }]}>Balance: <Text style={{ color: Palette.orange }}>{balance} RON</Text></Text>
                            <Button buttonStyle="primary" title="TOP-UP" onPress={() => { }} />
                        </View>

                    </View>
                )}

            </View>
        )
    }
}