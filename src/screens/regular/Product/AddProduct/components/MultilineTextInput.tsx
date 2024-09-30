/* eslint-disable prettier/prettier */
import { Box, TextInput, TrText } from "@utils/Theme";
import React from "react";

export default ({ label, placeHolder }) => {
  return (
    <Box marginVertical="l">
      <TrText variant={"regular12"} marginBottom="m" color="textColor05">
        {label}
      </TrText>
      <Box
        borderWidth={1}
        borderRadius="s"
        borderColor="borderColor01"
        padding="m"
      >
        <TextInput
          placeholder={placeHolder}
          multiline={true}
          textAlignVertical={"top"}
          numberOfLines={8}
        />
      </Box>
    </Box>
  );
};
