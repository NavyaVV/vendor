import CustomFlatlist from "@components/CustomFlatlist";
import SearchFilter from "@components/SearchFilter";
import { ReportActivityDummyData } from "@utils/ReportDummyData";
import { Box } from "@utils/Theme";
import React from "react";
import CardActivity from "./Card/CardActivity";
export default () => {
  const renderHeader = () => <SearchFilter placeholder="Search" />;
  const renderItem = (item: any) => <CardActivity {...item} />;
  return (
    <Box flex={1} paddingHorizontal="ml" marginHorizontal="m">
      <CustomFlatlist
        data={ReportActivityDummyData}
        renderHeader={renderHeader}
        renderItem={renderItem}
      />
    </Box>
  );
};
