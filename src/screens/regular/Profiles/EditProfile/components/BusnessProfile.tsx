import { useEffect } from "react";
import CountrySelector from "@components/CountrySelector";
import CustomTextInput from "@components/CustomTextInput";
import Dropdown from "@components/Dropdown";
import PhoneNumberInput from "@components/PhoneNumberInput";
import { setError } from "@store/reducers/profile";
import { getProfileCategories, getProfileInfo } from "@store/selector/profile";
import { businessProfileParams, profileErrorState } from "@typings/profile";
import { Box, TrText } from "@utils/Theme";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeImage from "./ChangeImage";

interface changeImageProps {
  errors: profileErrorState | null | undefined;
}

type paramState = businessProfileParams | undefined;

export default forwardRef<
  { getData: () => businessProfileParams | undefined },
  changeImageProps
>(({ errors }, ref) => {
  const categories = useSelector(getProfileCategories);
  const userDetails = useSelector(getProfileInfo);
  const profile = { ...userDetails?.business_profile };
  delete profile?.created_date;
  delete profile?.updated_date;
  // delete profile?.id;
  const [params, setParams] = useState<paramState>(profile);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({ getData: () => params }));

  const uploadProfile = (imageData) => {
    setParams({ ...params, imageData });
  };

  const handleTextChange = (
    key: keyof businessProfileParams,
    value: string
  ) => {
    setParams({ ...params, [key]: value });
    dispatch(setError({ ...errors, [key]: "" }));
  };

  return (
    <>
      <Box
        backgroundColor="secondary"
        borderColor="borderColor01"
        alignItems="center"
        justifyContent="center"
      >
        <ChangeImage
          handleImage={uploadProfile}
          updatedImage={
            params?.imageData?.image_ref ||
            `data:image/png;base64,${params?.profile_image_ref}`
          }
        />
      </Box>

      <TrText variant="semibold14" color="primary" marginVertical="l">
        BUSINESS INFORMATION
      </TrText>
      <CustomTextInput
        label="BUSINESS NAME"
        value={params?.business_name}
        onChangeText={(text) => handleTextChange("business_name", text)}
        errorMessage={errors?.business_name}
      />

      <Dropdown
        label="BUSINESS CATEGORY"
        labelField="category_name"
        valueField="id"
        dropdownData={categories ?? []}
        value={params?.business_category}
        setCategory={(text) => handleTextChange("business_category", text)}
        errorMessage={errors?.business_category}
      />

      <CustomTextInput
        label="WEBSITE"
        value={params?.website_url}
        onChangeText={(text) => handleTextChange("website_url", text)}
        errorMessage={errors?.website_url}
      />

      <PhoneNumberInput
        label="PHONE NUMBER"
        keyboardType="number-pad"
        value={params?.company_phone}
        onChangeText={(text) => handleTextChange("company_phone", text)}
        errorMessage={errors?.company_phone}
      />
      <CustomTextInput
        label="LANDLINE"
        keyboardType="number-pad"
        value={params?.company_landline}
        errorMessage={errors?.company_landline}
        onChangeText={(text) => handleTextChange("company_landline", text)}
      />
      <CustomTextInput
        label="EMAIL"
        value={params?.company_email}
        onChangeText={(text) => handleTextChange("company_email", text)}
        errorMessage={errors?.company_email}
      />
      <CustomTextInput
        label="ADDRESS"
        value={params?.address}
        onChangeText={(text) => handleTextChange("address", text)}
        errorMessage={errors?.address}
      />

      <CountrySelector
        onChangeFn={(text) => handleTextChange("country", text)}
      />

      <CustomTextInput
        label="STATE OR PROVINCE"
        value={params?.state}
        onChangeText={(text) => handleTextChange("state", text)}
        errorMessage={errors?.state}
      />

      <CustomTextInput
        label="ZIPCODE"
        value={params?.zip_code}
        onChangeText={(text) => handleTextChange("zip_code", text)}
        errorMessage={errors?.zip_code}
      />
      <CustomTextInput
        label="GST NO"
        value={params?.gst}
        onChangeText={(text) => handleTextChange("gst", text)}
        errorMessage={errors?.gst}
      />
      <CustomTextInput
        label="PAN NO"
        value={params?.pan}
        onChangeText={(text) => handleTextChange("pan", text)}
        errorMessage={errors?.pan}
      />
    </>
  );
});
