import { Box, Text, TextInput, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
import { TextInputProps } from "react-native/types";

export default (props: TextInputProps) => {
  return (
    <Box marginVertical="l">
      <Text variant="regular14">Enter OTP send to ***** 8428</Text>
      <Box
        height={52}
        borderWidth={1}
        flexDirection="row"
        alignItems="center"
        borderColor="borderColor01"
        borderRadius="m"
        marginTop="m"
        paddingHorizontal={"l"}
      >
        <TextInput style={{ flex: 1 }} {...props} />
        <TouchableBox>
          <TrText variant="semibold12" color="primary">
            RESEND OTP
          </TrText>
        </TouchableBox>
      </Box>
    </Box>
  );
};
