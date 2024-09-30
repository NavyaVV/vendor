import { Box, TextInput, Theme, TrText } from "@utils/Theme";
import React from "react";
import { TextInputProps } from "react-native/types";

const flex = { flex: 1 };
interface Multiprop extends TextInputProps {
  label: string;
  value: string;
  placeHolder?: string;
  mBottom?: keyof Theme["spacing"];
  mTop?: keyof Theme["spacing"];
  mHeight?: number;
}

export default ({
  label,
  placeHolder,
  mBottom,
  mTop,
  mHeight,
  value = "",
  ...props
}: Multiprop) => {
  return (
    <Box marginBottom={mBottom} marginTop={mTop}>
      <TrText variant="medium12" marginBottom="m" color="textColor05">
        {label}
      </TrText>
      <Box
        borderWidth={1}
        borderRadius="m"
        borderColor="borderColor01"
        padding="l"
        minHeight={mHeight}
      >
        <TextInput
          {...props}
          value={value}
          style={flex}
          multiline={true}
          returnKeyType="next"
          placeholder={placeHolder}
          textAlignVertical="top"
        />
      </Box>
    </Box>
  );
};
