import { useAppDispatch } from "@hooks/redux";
import { campaignListing } from "@store/reducers/campaigns";
import { WIDTH } from "@utils/dimensions";
import { images } from "@utils/Images";
import { Box, ImageBox } from "@utils/Theme";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import CampaignList from "./components/Campaigns";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import Menus from "./components/Menus";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(campaignListing({ limit: 7, offset: 1 }));
  }, [dispatch]);

  return (
    <Box flex={1} backgroundColor="secondary">
      <ImageBox
        source={images.background.source}
        height={WIDTH * images.background.aspectRatio}
        bottom={0}
        position="absolute"
        width={WIDTH}
      />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: bottom }}
      >
        <Carousel />
        <Menus />
        <CampaignList />
      </ScrollView>
    </Box>
  );
};
