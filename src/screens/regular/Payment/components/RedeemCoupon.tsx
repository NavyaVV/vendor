import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React from "react";

interface couponCodeProp {
  onPress(): void;
  couponCode?: object;
}

export default ({ onPress, couponCode }: couponCodeProp) => {
  return (
    <Box
      paddingHorizontal={"xxl"}
      alignItems="center"
      flexDirection="row"
      backgroundColor="textColor04"
      borderRadius="x3l"
      justifyContent="space-between"
      height={52}
    >
      <Box flexDirection="row" alignItems="center">
        <IconBold name="coupon" size={16} color="primary" />
        <Text marginLeft="m" variant="regular13" color="primary">
          {couponCode?.coupon_code} Coupon Applied
        </Text>
      </Box>
      <TouchableBox
        onPress={onPress}
        width={29}
        height={29}
        justifyContent="center"
        alignItems="center"
        backgroundColor="borderColor01"
        borderRadius="xl"
      >
        <IconBold name="close" size={11} color="primary" />
      </TouchableBox>
    </Box>
  );
};
