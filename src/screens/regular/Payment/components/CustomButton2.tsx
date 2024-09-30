import { normalize } from "@utils/dimensions";
import { Box, TouchableBox, TrText } from "@utils/Theme";
import React from "react";

export default () => {
  return (
    <Box
      width="100%"
      marginVertical="xx3l"
      flexDirection="row"
      justifyContent="center"
    >
      <TouchableBox
        width={normalize(120)}
        height={normalize(45)}
        backgroundColor="headerColor"
        justifyContent="center"
        alignItems="center"
        borderRadius="l"
      >
        <TrText variant="medium13" color="primary">
          MAY BE LATER
        </TrText>
      </TouchableBox>
      <TouchableBox
        width={normalize(120)}
        height={normalize(45)}
        backgroundColor="primary"
        justifyContent="center"
        alignItems="center"
        borderRadius="l"
        marginStart="m"
      >
        <TrText variant="medium13" color="secondary">
          TAKE A LOOK
        </TrText>
      </TouchableBox>
    </Box>
  );
};
