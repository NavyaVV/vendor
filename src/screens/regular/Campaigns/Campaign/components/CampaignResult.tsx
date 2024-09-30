import CustomFlatlist from "@components/CustomFlatlist";
import SearchDownload from "@components/SearchDownload";
import { CampaignResultDummyData } from "@utils/ReportDummyData";
import { Box } from "@utils/Theme";
import React from "react";
import Card from "./Card";
export default () => {
  const renderHeader = () => <SearchDownload placeholder="Search" />;
  const renderItem = (item: any) => <Card {...item} />;
  return (
    <Box flex={1} paddingHorizontal="ml" marginHorizontal="m">
      <CustomFlatlist
        data={CampaignResultDummyData}
        renderHeader={renderHeader}
        renderItem={renderItem}
      />
    </Box>
  );
};
