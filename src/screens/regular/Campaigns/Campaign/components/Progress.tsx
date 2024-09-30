import { salesPersonProgress } from "@utils/ReportDummyData";
import { Box } from "@utils/Theme";
import React from "react";
import { FlatList, ScrollView } from "react-native";
import { useAppSelector } from "@hooks/redux";
import { getCampaignDetails } from "@store/selector/campaigns";
import SalespersonCampaignDetailComponent from "./SalespersonCampaignDetailComponent";
import SalespersonProgressBar from "./SalespersonProgressBar";
import SalespersonProgressState from "./SalespersonProgressState";
import SelectSalesPersonDropDown from "./SelectSalesPersonDropDown";
export default () => {
  const details = useAppSelector(getCampaignDetails);
  return (
    <Box flex={1} marginHorizontal="xl">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box marginBottom="l" marginTop="l">
          <SelectSalesPersonDropDown details={details} />
          {/* <SalespersonProgressBar /> */}
          <SalespersonCampaignDetailComponent />

          <Box
            marginTop="x3l"
            borderColor="borderColor01"
            borderWidth={1}
            backgroundColor="boxColor22"
            borderRadius="m"
          >
            <Box paddingVertical="x3l">
              <FlatList
                data={salesPersonProgress}
                renderItem={SalespersonProgressState}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
