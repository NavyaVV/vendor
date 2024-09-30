import { IconBold } from "@utils/IconRegular";
import { Box, TextInput, useTheme } from "@utils/Theme";
import { TextInputProps } from "react-native";
import React from "react";

const inputStyle = { flex: 1 };

export default (props: TextInputProps) => {
  const { iconSize, colors } = useTheme();

  return (
    <Box
      flex={1}
      maxHeight={40}
      borderWidth={1}
      borderRadius="m"
      alignItems="center"
      flexDirection="row"
      paddingHorizontal="l"
      backgroundColor="secondary"
      borderColor="borderColor01"
    >
      <IconBold name="search" color="primary" size={iconSize.xml} />
      <TextInput
        marginStart="s"
        placeholderTextColor={colors.textColor04}
        style={inputStyle}
        color="secondary"
        {...props}
      />
    </Box>
  );
};
