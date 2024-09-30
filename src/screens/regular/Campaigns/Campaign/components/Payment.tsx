import CustomFlatlist from "@components/CustomFlatlist";
import SearchFilter from "@components/SearchFilter";
import { ReportPaymentDummyData } from "@utils/ReportDummyData";
import { Box } from "@utils/Theme";
import React from "react";
import CardPayment from "./Card/CardPayment";
export default () => {
  const renderHeader = () => <SearchFilter placeholder="Search" />;
  const renderItem = (item: any) => <CardPayment {...item} />;
  return (
    <Box flex={1} paddingHorizontal="ml" marginHorizontal="m">
      <CustomFlatlist
        data={ReportPaymentDummyData}
        renderHeader={renderHeader}
        renderItem={renderItem}
      />
    </Box>
  );
};
