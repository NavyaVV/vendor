import { IconTypes } from "@typings/IconTypes";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React from "react";

const textStyle = { flex: 1 };
interface selectionProps {
  content?: string;
  iconName?: IconTypes;
  onSelect?: () => void;
}

export default ({ content, iconName, onSelect }: selectionProps) => {
  return (
    <TouchableBox
      onPress={onSelect}
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="xxl"
      paddingVertical="xl"
    >
      <Box backgroundColor="borderColor01" borderRadius="x3l" padding="l">
        <IconBold name={iconName ?? "imageUpload"} size={20} color="primary" />
      </Box>
      <Text variant="regular14" marginStart="l" style={textStyle}>
        {content}
      </Text>
    </TouchableBox>
  );
};
