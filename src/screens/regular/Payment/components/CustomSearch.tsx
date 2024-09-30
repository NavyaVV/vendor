import { Box, Text, TextInput, TouchableBox, TrText } from "@utils/Theme";
import React from "react";

interface customSearchProps {
  label?: string;
  title?: string;
  onPressLabel?(): void;
}

export default ({
  label,
  title,
  onPressLabel,
  ...props
}: customSearchProps) => {
  return (
    <Box marginVertical="xxl">
      {label === "VERIFY" && <Text variant="regular12">{title}</Text>}
      <Box
        height={52}
        borderWidth={1}
        flexDirection="row"
        alignItems="center"
        borderColor="borderColor01"
        borderRadius="m"
        marginTop="m"
        paddingHorizontal="l"
      >
        <TextInput {...props} style={{ flex: 1 }} />
        <TouchableBox onPress={onPressLabel}>
          <TrText variant="semibold12" color="primary">
            {label ?? ""}
          </TrText>
        </TouchableBox>
      </Box>
    </Box>
  );
};
