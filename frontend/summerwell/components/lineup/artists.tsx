import { View, Text, SectionList } from "react-native";
import { Typography } from "@/constants/typography";
import { Colors, Palette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Artist from "@/components/ui/artist";

export default function Artists() {
  const theme = Colors[useColorScheme() ?? "light"];



  {/*TO POPULATE LATER*/}

  const rawArtists = [
    {
      title: "C",
      data: [
        { id: "clairo", name: "Clairo", image: "https://cdn-images.dzcdn.net/images/cover/6dfa4ea965a74b93870a85daa74b7ca3/0x1900-000000-80-0-0.jpg" },
        { id: "chappell", name: "Chappell Roan", image: "https://media.pitchfork.com/photos/64ff1676931354660ba71d8b/1:1/w_4358,h_4358,c_limit/Chappell-Roan-Princess.jpg" },
        { id: "charli", name: "Charli XCX", image: "https://www.atlanticrecords.com/sites/g/files/g2000015596/files/styles/artist_image_detail/public/2024-06/Charli%20XCX.jpg" },
      ]
    },
    {
      title: "F",
      data: [
        { id: "fontaines", name: "Fontaines D.C.", image: "https://i.scdn.co/image/ab67616100005174c4b9cd69cf77ce41487dd69a" }
      ]
    }
  ];

  const chunk = (arr: string | any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
    return result;
  };

  const sections = rawArtists.map((s) => ({
    ...s,
    data: chunk(s.data, 2),
  }));

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      {/* SUBHEADER */}
      <View style={{ backgroundColor: theme.subheader, height: 45, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingHorizontal: 30 }}>
        <Text style={[Typography.Header3, { color: Palette.white }]}>All</Text>
        <Text style={[Typography.Header3, { color: Palette.white }]}>Friday</Text>
        <Text style={[Typography.Header3, { color: Palette.white }]}>Saturday</Text>
        <Text style={[Typography.Header3, { color: Palette.white }]}>Sunday</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item[0].id + index}
        contentContainerStyle={{ paddingHorizontal: 13, marginTop: 16, paddingBottom: 16 }}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}

        renderSectionHeader={({ section: { title } }) => (
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={[Typography.Header2, { color: theme.textDark }]}>
              {title}
            </Text>
          </View>
        )}

        renderSectionFooter={({ section: sections }) => (
          <View
            style={{
              height: 2,
              backgroundColor: theme.devider1,
              marginBottom: 17,
              marginTop: 17,
            }}
          />
        )}

        renderItem={({ item: row }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 13,
            }}
          >
            <Artist {...row[0]} />
            {row[1] ? <Artist {...row[1]} /> : <View style={{ width: "48%" }} />}
          </View>
        )}
      />
    </View>
  );
}