import { IconTypes } from "@typings/IconTypes";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, Theme, TrText } from "@utils/Theme";
import React from "react";

interface optionProps {
  label?: string;
  label1?: string;
  data1?: string;
  data2?: string;
  label2?: string;
  name1?: IconTypes;
  name2?: IconTypes;
  textColor1?: keyof Theme["colors"];
  textColor2?: keyof Theme["colors"];
}

export default ({
  label1,
  data1,
  label2,
  data2,
  name1,
  name2,
  textColor1,
  textColor2,
}: optionProps) => {
  return (
    <Box flexDirection="row" marginVertical="xxl">
      <Box flex={1}>
        <TrText variant="regular12" marginBottom="l" color="textColor06">
          {label1}
        </TrText>
        <Box flexDirection="row" alignItems="center">
          {name1 && <IconBold name={name1} size={16} color="primary" />}
          <Text
            variant="regular13"
            color={textColor1}
            marginLeft={name1 && "m"}
          >
            {data1}
          </Text>
        </Box>
      </Box>
      <Box flex={1}>
        <TrText variant="regular12" marginBottom="l" color="textColor06">
          {label2}
        </TrText>
        <Box flexDirection="row" alignItems="center">
          {name2 && <IconBold name={name2} size={16} color="primary" />}
          <Text
            variant="regular13"
            color={textColor2}
            marginLeft={name1 && "m"}
          >
            {data2}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
