import { Box, Image, Text, TouchableBox } from "@utils/Theme";
import React from "react";

interface couponProps {
  item: any;
  onPressCoupon(): void;
}
export default ({ item, onPressCoupon }: couponProps) => {
  return (
    <TouchableBox
      marginHorizontal="xxl"
      padding="xl"
      borderWidth={1}
      marginBottom="l"
      borderColor="borderColor01"
      height={127}
      justifyContent="center"
      borderRadius="m"
      onPress={onPressCoupon}
    >
      <Box flexDirection="row" alignItems="center" marginBottom="m">
        <Image
          source={require("@assets/images/icic.png")}
          height={16}
          width={16}
        />
        <Text marginLeft="m" variant="medium15" color="textColor07">
          {item.coupon_code}
        </Text>
      </Box>
      <Text variant="light11">{item.description}</Text>
    </TouchableBox>
  );
};
