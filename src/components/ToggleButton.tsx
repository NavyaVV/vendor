import { Box, TouchableBox, TrText } from "@utils/Theme";
import React from "react";

export default ({ value = true, setValue }: { value: boolean, setValue: (value: boolean) => void }) => {

  return (
    <Box>
      <TrText variant="regular12" color="textColor05">
        REQUIRED
      </TrText>
      <TouchableBox
        marginVertical="m"
        onPress={() => setValue(!value)}
        width={51}
        height={22}
        borderRadius="xl"
        justifyContent="center"
        backgroundColor="boxColor17"
      >
        {value === false ? (
          <Box
            justifyContent="center"
            alignItems="flex-start"
            marginHorizontal="xss"
          >
            <Box
              width={22}
              height={21}
              backgroundColor="primary"
              borderRadius="xl"
            />
          </Box>
        ) : (
          <Box
            justifyContent="center"
            alignItems="flex-end"
            marginHorizontal="xss"
          >
            <Box
              width={22}
              height={21}
              backgroundColor="primary"
              borderRadius="xxl"
            />
          </Box>
        )}
      </TouchableBox>
    </Box>
  );
};
