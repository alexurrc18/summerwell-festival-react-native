import { View, Text } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";

export default function Schedule() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={[Typography.Header2, { color: Palette.white }]}>
        Schedule screen
      </Text>
    </View>
  );
}