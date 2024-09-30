import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React from "react";

interface DropProp {
  productName: string;
  onClear: () => void;
}

export default ({ productName, onClear }: DropProp) => {
  return (
    <Box
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor="boxColor35"
      marginVertical="s"
      paddingVertical="l"
      paddingHorizontal="s"
      borderRadius="x3l"
      opacity={0.6}
    >
      <Text marginStart="l" variant="regular12" color="textColor01">
        {productName}
      </Text>
      <TouchableBox
        backgroundColor="borderColor01"
        alignItems="center"
        height={20}
        width={20}
        borderRadius="x4l"
        justifyContent="center"
        marginEnd="l"
      >
        <TouchableBox
          width={26}
          height={26}
          borderRadius="x3l"
          backgroundColor="boxColor36"
          justifyContent="center"
          alignItems="center"
          onPress={onClear}
        >
          <IconBold name="close" size={8} color="primary" />
        </TouchableBox>
      </TouchableBox>
    </Box>
  );
};
