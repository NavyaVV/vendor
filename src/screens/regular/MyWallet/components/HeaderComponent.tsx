import { IconBold } from "@utils/IconRegular";
import { Box, TrText } from "@utils/Theme";
import React from "react";
import DashBoard from "./DashBoard";
import Wallet from "./Wallet";

export default () => {
  return (
    <Box marginTop="xl">
      <DashBoard />
      <Wallet />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginHorizontal="xxl"
        marginBottom="xl"
      >
        <TrText variant="medium15" color="textColor01">
          TRANSACTIONS
        </TrText>
        <Box
          padding="s"
          borderRadius="m"
          borderWidth={1}
          backgroundColor="boxColor27"
          borderColor="borderColor01"
          justifyContent="center"
          alignItems="center"
          height={40}
          width={40}
        >
          <IconBold name="filter" size={17} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};
