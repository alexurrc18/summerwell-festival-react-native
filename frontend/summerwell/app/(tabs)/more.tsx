import { View, Text, Pressable } from "react-native";
import { Typography } from "@/constants/typography";
import { Palette } from "@/constants/theme";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MoreScreen() {
  const theme = Colors[useColorScheme() ?? "light"];
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingTop: insets.top+20, padding: 16 }}>

      <Pressable style={{ paddingBottom: 15, marginBottom: 15, borderBottomWidth: 2, borderBottomColor: theme.devider1 }}>
        <Text style={[Typography.Header2, { color: theme.textDark }]}>My profile</Text>
      </Pressable>

      <Pressable style={{ paddingBottom: 15, marginBottom: 15, borderBottomWidth: 2, borderBottomColor: theme.devider1 }}>
        <Text style={[Typography.Header2, { color: theme.textDark }]}>Partners</Text>
      </Pressable>

      <Pressable style={{ paddingBottom: 15, marginBottom: 15, borderBottomWidth: 0, borderBottomColor: theme.devider1 }}>
        <Text style={[Typography.Header2, { color: theme.textDark }]}>Bucharest X Summer Well</Text>
      </Pressable>
    
    </View>
  );
}
