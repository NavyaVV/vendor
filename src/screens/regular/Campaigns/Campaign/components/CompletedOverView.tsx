import { Box } from "@utils/Theme";
import React from "react";
import { ScrollView } from "react-native";
import OverviewCampaignInfoCompleted from "./OverviewCampaignInfoCompleted";
export default () => {
  return (
    <Box flex={1} marginHorizontal="xxl">
      <ScrollView showsVerticalScrollIndicator={false}>
        <OverviewCampaignInfoCompleted />
      </ScrollView>
    </Box>
  );
};
