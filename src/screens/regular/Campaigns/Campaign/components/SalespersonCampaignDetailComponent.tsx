import { Box } from "@utils/Theme";
import React from "react";
import SalespersonCampaignDetailsBox from "./SalespersonCampaignDetailsBox";
export default () => {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <SalespersonCampaignDetailsBox
        heading="SHOPS VISITED"
        iconName="shop"
        value="212"
        bgColor="boxColor22"
        borderColor="borderColor01"
        iconColor="primary"
        valueColor="primary"
      />
      <SalespersonCampaignDetailsBox
        heading="PAYMENT EARNED"
        iconName="walletEarned"
        value="₹80,000"
        bgColor="boxColor07"
        borderColor="boxColor07"
        iconColor="boxColor23"
        valueColor="boxColor23"
      />
      <SalespersonCampaignDetailsBox
        heading="XP EARNED"
        iconName="shiningStar"
        value="560"
        bgColor="boxColorOrange3"
        borderColor="boxColor10"
        iconColor="boxColor03"
        valueColor="boxColor03"
      />
    </Box>
  );
};
