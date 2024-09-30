import { useAppSelector } from "@hooks/redux";
import { getProfileInfo } from "@store/selector/profile";
import { Box } from "@utils/Theme";
import React from "react";
import { ProfileDetails } from "./ProfileDetailsComponent";

export default () => {
  const profileInfo = useAppSelector(getProfileInfo);
  console.log("profileInfo?.business_profile :", profileInfo);
  return (
    <Box
      backgroundColor="secondary"
      flex={1}
      marginTop="x3l"
      paddingHorizontal="l"
    >
      <Box flexDirection="row">
        <Box marginVertical="l" justifyContent="flex-start">
          <ProfileDetails
            content={profileInfo?.business_profile.company_phone}
            label="Phone Number"
          />
          <ProfileDetails
            content={profileInfo?.business_profile.website_url}
            label="Website"
          />
          <ProfileDetails
            content={profileInfo?.business_profile.address}
            label="Address"
          />
        </Box>
        <Box marginVertical="l" justifyContent="flex-start" marginStart="x3l">
          <ProfileDetails
            content={profileInfo?.business_profile.company_landline}
            label="Landline"
          />

          <ProfileDetails
            content={profileInfo?.business_profile.company_email}
            label="Email"
          />
        </Box>
      </Box>
      <Box flexDirection="row">
        <Box marginVertical="l" justifyContent="flex-start">
          <ProfileDetails
            content={profileInfo?.business_profile.country}
            label="Country"
          />
          <ProfileDetails
            content={profileInfo?.business_profile.zip_code}
            label="Zip Code"
          />
        </Box>
        <Box marginVertical="l" justifyContent="flex-start" marginStart="x3l">
          <ProfileDetails
            content={profileInfo?.business_profile.state}
            label="State/Province"
          />
        </Box>
      </Box>
    </Box>
  );
};
