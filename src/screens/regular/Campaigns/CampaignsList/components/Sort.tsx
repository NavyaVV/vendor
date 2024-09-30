import { Box, Theme, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
interface sortProp {
  onPressAscending?(): void;
  onPressDescending?(): void;
  backgroundAscending: keyof Theme["colors"];
  backgroundDescending: keyof Theme["colors"];
}
export default ({
  onPressAscending,
  onPressDescending,
  backgroundAscending,
  backgroundDescending,
}: sortProp) => {
  return (
    <Box marginTop="l">
      <TrText marginBottom="xxl" variant="regular12">
        SORT BY
      </TrText>
      <Box flexDirection="row">
        <TouchableBox
          onPress={onPressAscending}
          flexDirection="row"
          alignItems="center"
          marginRight="x3l"
        >
          <Box
            width={18}
            height={18}
            borderWidth={1}
            borderColor="borderColor01"
            backgroundColor="secondary"
            borderRadius="l"
            justifyContent="center"
            alignItems="center"
            marginRight="m"
          >
            <Box
              width={10}
              height={10}
              backgroundColor={backgroundAscending}
              borderRadius="l"
            />
          </Box>
          <TrText variant="regular12">ASCENDING</TrText>
        </TouchableBox>
        <TouchableBox
          flexDirection="row"
          alignItems="center"
          onPress={onPressDescending}
        >
          <Box
            borderColor="borderColor01"
            borderWidth={1}
            width={18}
            height={18}
            backgroundColor="secondary"
            borderRadius={"l"}
            justifyContent="center"
            alignItems="center"
            marginRight="m"
          >
            <Box
              width={10}
              height={10}
              backgroundColor={backgroundDescending}
              borderRadius="l"
            />
          </Box>
          <TrText variant="regular12">DESCENDING</TrText>
        </TouchableBox>
      </Box>
    </Box>
  );
};
