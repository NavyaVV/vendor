import { Box, Text } from "@utils/Theme";
import React from "react";

interface breakupProp {
  title: string;
  price: number;
  coupon?: boolean;
}

export default ({ title, price, coupon }: breakupProp) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      marginHorizontal="xxl"
      marginBottom="xl"
    >
      <Text variant="regular14" color="textColor01">
        {title}
      </Text>
      <Text
        variant="regular14"
        color={(price < 1) | coupon ? "boxColor05" : "textColor06"}
      >
        {!coupon ? "₹" : "-"}
        {price}
      </Text>
    </Box>
  );
};
