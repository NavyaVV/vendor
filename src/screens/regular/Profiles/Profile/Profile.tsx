import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { profileView } from "@store/reducers/profile";
import { getProfileCategories, getProfileInfo } from "@store/selector/profile";
import { images } from "@utils/Images";
import { Box, Image, ImageBox, Text, TrText } from "@utils/Theme";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import BasicProfileDetails from "./components/BasicProfileDetails";
import PointOfContact from "./components/PointOfContact";
import ProfileHeader from "./components/ProfileHeader";
import PlaceholderIcon from "@components/PlaceholderIcon";
import { WIDTH } from "@utils/dimensions";
import { useIsFocused } from "@react-navigation/native";

export default () => {
  const [businessProfile, setBusinessProfile] = useState({});
  const profileInfo = useAppSelector(getProfileInfo);
  const categories = useAppSelector(getProfileCategories);
  const dispatch = useAppDispatch();
  const focussed = useIsFocused();

  useEffect(() => {
    dispatch(profileView());
  }, [focussed]);

  useEffect(() => {
    if (profileInfo) {
      const { business_profile = {} } = profileInfo;
      setBusinessProfile({ ...business_profile });
    }
  }, [profileInfo]);

  const category = categories?.find(
    (state) => state.id === profileInfo?.business_profile.business_category
  )?.category_name;

  return (
    <Box flex={1} backgroundColor="secondary">
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ImageBox
          source={images.profileBg.source}
          height={500 * images.profileBg.aspectRatio}
          width="100%"
          alignItems="center"
        >
          <ProfileHeader
            iconName="edit"
            headerText="Profile"
            onPress={() => navigate(ROUTES.EDITPROFILE)}
          />
        </ImageBox>
        <Box
          backgroundColor="boxColor18"
          justifyContent="center"
          borderRadius="x5l"
          alignItems="center"
          height={118}
          width={118}
          bottom={70}
          left={(WIDTH - 118) * 0.5}
        >
          <PlaceholderIcon icon="user" size={60} />
          <Image
            source={
              businessProfile?.profile_image_ref?.length
                ? {
                    uri: `data:image/png;base64,${businessProfile.profile_image_ref}`,
                  }
                : images.profileBg.source
            }
            borderRadius="x5l"
            height={108}
            width={108}
          />
        </Box>
        <Box alignItems="center" marginVertical="xl" bottom={80} flex={2}>
          <Text variant="semibold20" color="primary">
            {businessProfile.business_name}
          </Text>
          <Text variant="regular14" color="textColor11">
            {category}
          </Text>
        </Box>
        <Box flex={2} bottom={130}>
          <BasicProfileDetails />
          <Box marginStart="x2l">
            <TrText variant="semibold14" color="primary">
              POINT OF CONTACT
            </TrText>
          </Box>
          <PointOfContact />
        </Box>
      </ScrollView>
    </Box>
  );
};
