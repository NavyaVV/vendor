import { IconBold } from "@utils/IconRegular";
import { Box, TouchableBox, TrText } from "@utils/Theme";
import React from "react";

export default ({ onPress }) => {
  return (
    <TouchableBox
      onPress={onPress}
      height={52}
      borderWidth={1}
      flexDirection="row"
      paddingHorizontal="l"
      borderRadius="m"
      alignItems="center"
      borderColor="borderColor01"
      justifyContent="space-between"
    >
      <Box marginRight="ml" flexDirection="row" alignItems="center">
        <IconBold name="coupon" size={16} color="primary" />
        <TrText marginLeft="ml">USE COUPONS</TrText>
      </Box>
      <IconBold name="rightArrow" size={16} />
    </TouchableBox>
  );
};
