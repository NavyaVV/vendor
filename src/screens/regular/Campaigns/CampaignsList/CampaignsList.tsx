import FloatingAdd from "@components/FloatingAdd";
import Header from "@components/Header";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { BOTTOM_TAB } from "@utils/dimensions";
import { Box } from "@utils/Theme";
import { useAppDispatch } from "@hooks/redux";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CampaignsList from "./components/CampaignsList";

export default () => {
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="CAMPAIGNS" iconName="menu" />
      <Box flex={1} style={{ marginBottom: BOTTOM_TAB + bottom }}>
        <CampaignsList />
        <FloatingAdd
          onPress={() => {
            dispatch({ type: "UPDATE_NEW_CAMP_DATA" });
            navigate(ROUTES.ADDCAMPAIGNS);
          }}
        />
      </Box>
    </Box>
  );
};
