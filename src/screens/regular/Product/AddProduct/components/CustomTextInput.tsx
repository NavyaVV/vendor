import { Box, TextInput, TrText } from "@utils/Theme";
import React from "react";

export default ({ label, placeHolder, value, onChangeText, editable }: any) => {
  return (
    <Box marginVertical="l">
      <TrText variant={"regular12"} marginBottom="m" color="textColor05">
        {label}
      </TrText>
      <Box
        borderWidth={1}
        borderRadius="m"
        height={52}
        borderColor="borderColor01"
        padding="m"
      >
        <TextInput
          placeholder={placeHolder}
          value={value}
          style={{ color: "#FA97BC", flex: 1 }}
          onChangeText={onChangeText}
          editable={editable}
        />
      </Box>
    </Box>
  );
};
