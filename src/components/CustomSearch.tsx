import { Box, Text, TextInput, TouchableBox, TrText } from "@utils/Theme";
import React from "react";

const inputStyle = { flex: 1 };

interface customSearchProps {
  placeholder: string;
  label: string;
  title: string;
}

export default ({ placeholder, label, title }: customSearchProps) => {
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
        <TextInput style={inputStyle} placeholder={placeholder} />
        <TouchableBox>
          <TrText variant="semibold12" color="primary">
            {label}
          </TrText>
        </TouchableBox>
      </Box>
    </Box>
  );
};
