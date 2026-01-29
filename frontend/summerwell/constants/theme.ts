import { DarkTheme } from "@react-navigation/native";
import { Platform } from "react-native";

// palette colors

export const Palette = {
  black: "#000000",
  white: "#FFFFFFFF",


  lightGray: "#F3F3F6",
  gray: "#E8E6ED",
  darkGray: "#898397",
  darkNavyBlue: "#142166",

  orange: "#D9883A",
  yellow: "#EBBA52",
  purple: "#8B6DF6",
  blue: "#2F67F5",
  navyBlue: "#284099",
  darkBlue: "#000232",
  cyan: "#68B3E0",
  pink: "#DF78A1",
} as const;

// theme colors
export const Colors = {
  light: {
    background: Palette.white,
    textDark: Palette.darkBlue,
    textLight: Palette.white,
    textDesc: Palette.darkGray,
    bottomNav: Palette.gray,
    header: Palette.orange,
    subheader: Palette.darkBlue,
    selected: Palette.blue,

    primary: Palette.blue,
    secondary: Palette.orange,
    tertiary: Palette.lightGray,

    timeIndicator: Palette.purple,

    buttonTextLight: Palette.white,
    buttonTextDark: Palette.darkBlue,

    artistText: Palette.white,

    devider1: Palette.gray,
    devider1_50: Palette.lightGray,
    devider2: Palette.darkGray,
    devider3: Palette.darkNavyBlue,

    mapGrass: "#71b65d",
    mapRoad: "#4f7f41",
    mapBuilding: "#4f7f41",
    mapWater: "#98dcfe",
    mapManMade: "#4f7f41",

  },
  dark: {
    background: Palette.darkBlue,
    textDark: Palette.white,
    textLight: Palette.darkBlue,
    textDesc: Palette.darkGray,
    bottomNav: Palette.navyBlue,
    header: Palette.blue,
    subheader: Palette.navyBlue,
    selected: Palette.orange,

    primary: Palette.blue,
    secondary: Palette.orange,
    tertiary: Palette.lightGray,

    timeIndicator: Palette.purple,

    buttonTextLight: Palette.white,
    buttonTextDark: Palette.darkBlue,

    artistText: Palette.white,

    devider1: Palette.navyBlue,
    devider1_50: Palette.darkNavyBlue,
    devider2: Palette.navyBlue,
    devider3: Palette.blue,

    mapGrass: "#1f5a2e",
    mapRoad: "#1f763b",
    mapBuilding: "#1e4c25",
    mapWater: "#19164f",
    mapManMade: "#0d610d",

  },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});