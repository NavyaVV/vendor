import AlertPopup from "@components/AlertPopup";
import CustomDoubleButton from "@components/CustomDoubleButton";
import Header from "@components/Header";
import { Box } from "@utils/Theme";
import React from "react";
import { ScrollView } from "react-native";
import CampaignInfo from "./CampaignInfo";
import ProgressIndicator from "./ProgressIndicator";

export interface optionProps {
  onPressPrimeButton: () => void;
  onPressSecondButton: () => void;
  popupVisibility: boolean;
  onClosePopup: () => void;
  onConfirmPopup: () => void;
  campaignPreviewData: any;
  loader: boolean;
}

export default ({
  onPressPrimeButton,
  onPressSecondButton,
  campaignPreviewData,
  loader,
  popupVisibility,
  onClosePopup,
  onConfirmPopup,
}: optionProps) => {
  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="CAMPAIGN PREVIEW" iconName="menu" />
      <ScrollView
        style={{ flex: 1, marginHorizontal: 22 }}
        showsVerticalScrollIndicator={false}
      >
        <ProgressIndicator
          serialNo1={1}
          serialNo2={2}
          serialNo3={3}
          serialNo4={4}
          setBg={4}
        />
        <CampaignInfo campaignPreview={campaignPreviewData} />

        <CustomDoubleButton
          primaryButton="PROCEED"
          secondaryButton="BACK"
          onPressPrimary={onPressPrimeButton}
          onPressSecondary={onPressSecondButton}
          loading={loader}
        />
        <AlertPopup
          visible={popupVisibility}
          onClose={onClosePopup}
          type="Success"
          onConfirm={onConfirmPopup}
        />
      </ScrollView>
    </Box>
  );
};
