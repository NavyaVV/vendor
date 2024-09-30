import React from "react";
import { Box, ImageBox, TrText } from "@utils/Theme";
import { ImageSourcePropType } from "react-native";
import { WIDTH } from "@utils/dimensions";

interface renderFunctionProps {
  item: {
    image: ImageSourcePropType;
    name: string;
    desc: string;
  };
}

export const renderFunction = ({ item }: renderFunctionProps) => (
  <ImageBox flex={1} source={item.image}>
    <Box flex={1} width={WIDTH} height={110} justifyContent="flex-end">
      <Box marginHorizontal="xx3l">
        <TrText variant="bold27" marginBottom="xxl" color="textColor01">
          {item.name}
        </TrText>
        <TrText marginBottom="xxx4l" color="textColor01">
          {item.desc}
        </TrText>
      </Box>
    </Box>
  </ImageBox>
);
