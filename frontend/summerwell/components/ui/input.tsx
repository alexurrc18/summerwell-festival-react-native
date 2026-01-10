import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Typography } from "@/constants/typography";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function Input(props: TextInputProps) {
  const theme = Colors[useColorScheme() ?? "light"];
  const { style, ...otherProps } = props;

  return (
    <TextInput
      placeholderTextColor={theme.textDark}
      style={[ Typography.Body1, { color: theme.textDark, borderWidth: 1, borderColor: theme.devider2, borderRadius: 10, padding: 15,}, style ]}
      {...otherProps}
    />
  );
}