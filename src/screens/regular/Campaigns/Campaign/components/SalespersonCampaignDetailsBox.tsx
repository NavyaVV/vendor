import { WIDTH } from "@utils/dimensions";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, Theme, TrText } from "@utils/Theme";
import React from "react";
interface DetailProp {
  iconName: string;
  heading: string;
  value: string;
  bgColor: keyof Theme["colors"];
  borderColor: keyof Theme["colors"];
  iconColor: keyof Theme["colors"];
  valueColor: keyof Theme["colors"];
}
export default ({
  iconName,
  heading,
  value,
  bgColor,
  borderColor,
  iconColor,
  valueColor,
}: DetailProp) => {
  return (
    <Box
      height={125}
      width={WIDTH / 3.5}
      backgroundColor={bgColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius="m"
    >
      <Box marginStart="l" marginTop="xl">
        <IconBold name={iconName} size={23} color={iconColor} />
        <Box marginTop="m">
          <TrText variant="regular10" color="textColor11" marginVertical="s">
            {heading}
          </TrText>
          <Text variant="semibold15" color={valueColor}>
            {value}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
