/* eslint-disable prettier/prettier */
import { useAppSelector } from "@hooks/redux";
import { getWalletInfo } from "@store/selector/wallet";
import { images } from "@utils/Images";
import { Box, ImageBox, Text, TrText, useTheme } from "@utils/Theme";
import React from "react";

export default () => {
  const { borderRadii } = useTheme();
  const walletInfo = useAppSelector(getWalletInfo);

  return (
    <ImageBox
      source={images.banner2.source}
      height={128}
      backgroundColor="primary"
      justifyContent="center"
      marginHorizontal="xxl"
      paddingHorizontal="xxl"
      borderRadius="l"
      imageStyle={{ borderRadius: borderRadii.l }}
    >
      <Box>
        <TrText variant="light13" color="textColor09">
          AVAILABLE BALANCE
        </TrText>
        <Text variant="heavy28" color="textColor09">
          ₹{walletInfo?.available_balance}
        </Text>
      </Box>
    </ImageBox>
  );
};
