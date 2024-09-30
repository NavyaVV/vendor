import { Box } from "@utils/Theme";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import OverviewCampaignInfo from "./OverviewCampaignInfo";
import { campaignsDetails } from "@store/reducers/campaigns";
import { useThunk } from "@hooks/use-thunk";
import Loader from "@components/Loader";

interface overviewProps {
  id: string | number;
}

export default ({ id }: overviewProps) => {
  const [getDetails, loading] = useThunk(campaignsDetails);

  useEffect(() => {
    getDetails({ id });
  }, []);

  return (
    <Box flex={1} marginHorizontal="xxl">
      {loading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <OverviewCampaignInfo />
        </ScrollView>
      )}
    </Box>
  );
};
