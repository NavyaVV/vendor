import { useEffect } from "react";
import CustomAutoSearch from "@components/CustomAutoSearch";
import CustomDoubleButton from "@components/CustomDoubleButton";
import CustomTextInput from "@components/CustomTextInput";
import Header from "@components/Header";
import { addLocationsValidation } from "@helpers/campaigns";
import { useAppDispatch } from "@hooks/redux";
import { setError } from "@store/reducers/campaigns";
import {
  addCampaignLocationPramstate,
  campaignDetailState,
} from "@typings/campaigns";
import { Box, Text, TrText } from "@utils/Theme";
import { locationParams } from "@typings/service";
import React, { useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import Map from "./Map";
import ProgressIndicator from "./ProgressIndicator";
import SearchResults from "./SearchResults";
import Slider from "./Slider";

type errorState = { [key in keyof addCampaignLocationPramstate]: string };
export interface optionProps {
  // campaignDetailsInfo: campaignDetailState | null | undefined;
  campaignDatas: any;
  onPressPrimeButton: (params: object, next: boolean) => void;
  onPressSecondButton: () => void;
}

const shopPrice = 100;

export default ({
  onPressPrimeButton,
  onPressSecondButton,
  // campaignDetailsInfo,
  campaignDatas,
}: optionProps) => {
  const dispatch = useAppDispatch();
  const [estimatedPrice, setEstimatedPrice] = useState<Number>(shopPrice);
  const [sliderValue, setSliderValue] = useState<Array<number>>([1]);
  const [errorMsg, setErrorMsg] = useState<errorState>({});
  const [campaignsLocationData, setCampaignsLocationData] =
    useState<addCampaignLocationPramstate>({});
  const coordinates = campaignsLocationData.campaignArea?.length
    ? campaignsLocationData.campaignArea[0].coordinates
    : undefined;

  useEffect(() => {
    setCampaignsLocationData({ ...campaignDatas });
    const price = campaignDatas?.estimatedPrice || shopPrice;
    setEstimatedPrice(price);
    setSliderValue([price / shopPrice]);
  }, [campaignDatas]);

  const handleSliderChange = (value: any) => {
    setSliderValue(value);
    const price = shopPrice * value[0];
    setEstimatedPrice(price);
    console.log("sliderValue :", sliderValue);
    handleTextChange("estimatedPrice", price);
    handleTextChange("salesCount", value[0] || 0);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    const validation = addLocationsValidation(campaignsLocationData);
    setErrorMsg(validation.errorMsg);
    if (!validation.status) onPressPrimeButton(campaignsLocationData, true);
  };

  const handleTextChange = (
    key: keyof addCampaignLocationPramstate,
    text: string | number
  ) => {
    setErrorMsg({ ...errorMsg, [key]: null });
    dispatch(setError());
    const params = {
      ...campaignsLocationData,
      [key]: text,
    };
    onPressPrimeButton({ ...params }, false);
    setCampaignsLocationData({ ...params });
  };

  const handleSelectLocation = (location: locationParams) => {
    const params = {
      ...campaignsLocationData,
      city: location.city,
      district: location.district,
      state: location.state,
      campaignArea: [
        {
          area: location.area ?? "",
          coordinates: location.latitude + "/" + location.longitude,
        },
      ],
    };
    onPressPrimeButton({ ...params }, false);
    setCampaignsLocationData({
      ...params,
    });
  };

  const name = campaignDatas?.name || "";

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header prefix={name} headerText="LOCATION/AREA" iconName="menu" />
      <ScrollView
        style={{ marginHorizontal: 22 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <ProgressIndicator
          serialNo1={1}
          serialNo2={2}
          serialNo3={3}
          serialNo4={4}
          setBg={2}
        />
        <CustomAutoSearch
          mandatory
          label="AREA"
          errorMessage={errorMsg.campaignArea}
          onSelect={handleSelectLocation}
          placeHolder={
            campaignsLocationData.campaignArea?.length
              ? campaignsLocationData.campaignArea[0].area
              : ""
          }
        />
        <CustomTextInput
          mandatory
          label="STATE"
          value={campaignsLocationData.state}
          placeholder="State"
          onChangeText={(text) => handleTextChange("state", text)}
          errorMessage={errorMsg.state}
        />
        <CustomTextInput
          mandatory
          label="DISTRICT"
          value={campaignsLocationData.district}
          placeholder="District"
          onChangeText={(text) => handleTextChange("district", text)}
          errorMessage={errorMsg.district}
        />
        <Box
          height={380}
          borderWidth={1}
          marginTop="xl"
          padding="xl"
          borderColor="borderColor01"
        >
          <Map coordinates={coordinates} />
        </Box>
        <SearchResults />
        <Box
          flexDirection="row"
          style={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          <TrText variant="regular12" marginBottom="s" color="textColor05">
            {"SLIDER"}
          </TrText>
          <Text style={{ marginTop: -7 }}> : {sliderValue}</Text>
        </Box>
        <Slider value={sliderValue} setValue={handleSliderChange} />
        <CustomTextInput
          label="ESTIMATED PRICE"
          placeholder="PRICE"
          editable={false}
          value={`${estimatedPrice}`}
          iconLeftName="inrCurrency"
        />
        <CustomDoubleButton
          primaryButton="NEXT"
          secondaryButton="BACK"
          onPressSecondary={onPressSecondButton}
          onPressPrimary={handleSubmit}
        />
      </ScrollView>
    </Box>
  );
};
