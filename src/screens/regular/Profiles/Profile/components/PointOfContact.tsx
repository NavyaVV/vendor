import { useAppSelector } from "@hooks/redux";
import { getProfileInfo } from "@store/selector/profile";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
import { ProfileDetails } from "./ProfileDetailsComponent";

export default () => {
  const profileInfo = useAppSelector(getProfileInfo);
  const files = profileInfo?.company_files.length
    ? profileInfo?.company_files[0]
    : undefined;
  const poc = profileInfo?.point_of_contact.length
    ? profileInfo?.point_of_contact[0]
    : undefined;
  const name = "" + (poc?.first_name ?? "") + (poc?.last_name ?? "");

  console.log("profileInfo?.point_of_contact :", profileInfo?.business_profile);

  return (
    <Box backgroundColor="secondary" flex={1} paddingHorizontal="l">
      <Box flexDirection="row">
        <Box marginVertical="l" justifyContent="flex-start">
          <ProfileDetails content={name} label="Name" />
          <ProfileDetails content={poc?.phone} label="Phone Number" />
          <ProfileDetails
            content={profileInfo?.business_profile?.gst}
            label="GST Number"
          />
        </Box>
        <Box marginVertical="l" justifyContent="flex-start" marginStart="x3l">
          <ProfileDetails content={poc?.designation} label="Designation" />
          <ProfileDetails content={poc?.email} label="Email Address" />
          <ProfileDetails
            content={profileInfo?.business_profile?.pan}
            label="PAN Number"
          />
        </Box>
      </Box>

      <Box marginStart="xl">
        <Box flexDirection="row" alignItems="center">
          <TrText variant="regular12" color="textColor01">
            COMPANY FILE
          </TrText>
          <Box
            height={1}
            width={220}
            marginStart="l"
            backgroundColor="borderColor01"
          />
        </Box>
        <Box marginTop="l" marginBottom="l">
          <TouchableBox
            height={38}
            flexDirection="row"
            alignItems="center"
            borderRadius="m"
            backgroundColor="headerColor"
          >
            <Box marginHorizontal="m">
              <IconBold name="pdf" color="primary" size={15} />
            </Box>
            <Text variant="regular12" color="textColor01">
              {files?.company_file_ref}
            </Text>
          </TouchableBox>
        </Box>
      </Box>
    </Box>
  );
};
