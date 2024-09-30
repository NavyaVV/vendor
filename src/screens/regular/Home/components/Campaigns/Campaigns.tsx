import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { useAppSelector } from "@hooks/redux";
import { getCampaignInfo } from "@store/selector/campaigns";
import { Box, TouchableBox, TrText, useTheme } from "@utils/Theme";
import React from "react";
import { FlatList } from "react-native";
import CampaignCard from "@components/CampaignCard";

// without footerSpace the last element in flatlist is partially visible and the footer space is exactly the same height of Bottom Tab
const renderFooter = () => {
  return <Box height={65} />;
};

export default () => {
  const { spacing } = useTheme();
  const campaignInfo = useAppSelector(getCampaignInfo);

  const handleWallet = () => navigate(ROUTES.CAMPAIGNS);

  return (
    <>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="xxl"
        marginBottom="m"
      >
        <TrText variant="medium12" color="textColor01">
          CAMPAIGNS
        </TrText>
        <TouchableBox onPress={handleWallet}>
          <TrText variant="regular12" color="primary">
            VIEW ALL
          </TrText>
        </TouchableBox>
      </Box>
      <FlatList
        scrollEnabled={false}
        data={campaignInfo?.results?.slice(0, 5)}
        style={{ paddingHorizontal: spacing.xxl }}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <CampaignCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
    </>
  );
};
