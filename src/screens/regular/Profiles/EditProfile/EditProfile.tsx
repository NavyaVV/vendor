import { useState, useEffect } from "react";
import CustomButton from "@components/CustomButton";
import Header from "@components/Header";
import { editProfileValidation } from "@helpers/profile";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { editProfile, setError } from "@store/reducers/profile";
import { getErrors, getLoading } from "@store/selector/profile";
import {
  businessProfileParams,
  companyFilesParams,
  pointOfContactParams,
} from "@typings/profile";
import { Box } from "@utils/Theme";
import React, { useCallback, useRef } from "react";
import { Keyboard, ScrollView } from "react-native";
import BusnessProfile from "./components/BusnessProfile";
import CompanyFiles from "./components/CompanyFiles";
import PointofContact from "./components/PointofContact";
import AlertPopup from "@components/AlertPopup";
import { useNavigation } from "@react-navigation/native";
import { createAssets } from "@store/reducers/common";
import { getAssets } from "@store/selector/common";
import { clearAssets } from "@store/reducers/common";

type pocRefType = {
  getData: () => pointOfContactParams | undefined;
};
type filesRefType = {
  getData: () => companyFilesParams | undefined;
};
type busnessRefType = {
  getData: () => businessProfileParams | undefined;
};

export default () => {
  const pocRef = useRef<pocRefType>(null);
  const filesRef = useRef<filesRefType>(null);
  const busnessRef = useRef<busnessRefType>(null);
  const dispatch = useAppDispatch();
  const errors = useAppSelector(getErrors);
  const loading = useAppSelector(getLoading);
  const [showPopup, setShowPopup] = useState(false);
  const { goBack } = useNavigation();
  const productAssetsData = useAppSelector(getAssets);
  const [profileImage, setProfileImage] = useState(null);
  const [loader, setLoader] = useState(loading === "pending" || false);

  useEffect(() => {
    if (productAssetsData) {
      setProfileImage(productAssetsData[0].reference_number);
      setLoader(false);
    }
  }, [productAssetsData]);

  useEffect(() => {
    if (profileImage) handleSubmit();
  }, [profileImage]);

  const uploadProfile = () => {
    const imageData = busnessRef.current?.getData().imageData;
    if (imageData?.image_ref) {
      setLoader(true);
      const callback = () => {};
      let imageSplit = imageData.image_ref?.split("/");
      const imageParams = [
        {
          reference_number: imageData.image_ref,
          file_name: imageSplit[imageSplit?.length - 1],
          file_description: "Profile Image",
          file_type: imageData.mime,
          base64: imageData.base64,
        },
      ];

      dispatch(createAssets({ imageParams, callback }));
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setLoader(false);
    Keyboard.dismiss();
    let business_profile = busnessRef.current?.getData();
    const poc = pocRef.current?.getData();
    const files = filesRef.current?.getData();
    if (profileImage) {
      business_profile = {
        ...business_profile,
        profile_image_ref: profileImage,
      };
    } else {
      delete business_profile.profile_image_ref;
    }
    const params = { ...business_profile, ...poc, ...files };
    const validation = editProfileValidation(params);
    dispatch(setError(validation.errorMsg));
    const point_of_contact = poc?.email ? [poc] : [];
    const company_files = files?.company_file_ref
      ? [{ ...files, id: files?.company_file_ref }]
      : [];
    const arg = { business_profile, point_of_contact, company_files };
    console.log("editProfile arg :", arg);
    if (!validation.status) dispatch(editProfile({ arg }));
  };

  useEffect(() => {
    if (loading === "succeeded") {
      setShowPopup(true);
      dispatch(clearAssets(null));
    }
  }, [loading]);

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="PROFILE" iconName="menu" />
      <ScrollView>
        <Box marginHorizontal="xxl" marginTop="xxl" marginBottom="xl">
          <BusnessProfile ref={busnessRef} errors={errors} />
          <CompanyFiles ref={filesRef} errors={errors} />
          <PointofContact ref={pocRef} errors={errors} />
          <CustomButton
            label="SAVE CHANGES"
            onPress={uploadProfile}
            loading={loader || loading === "pending"}
          />
          <AlertPopup
            type="Success"
            onConfirm={() => {
              setProfileImage(null);
              goBack();
            }}
            visible={showPopup}
            onClose={() => setShowPopup(false)}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};
