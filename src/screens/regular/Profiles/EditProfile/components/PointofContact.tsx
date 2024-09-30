import CustomTextInput from "@components/CustomTextInput";
import PhoneNumberInput from "@components/PhoneNumberInput";
import { setError } from "@store/reducers/profile";
import { getProfileInfo } from "@store/selector/profile";
import {
  companyFilesParams,
  pointOfContactParams,
  profileErrorState,
} from "@typings/profile";
import { TrText } from "@utils/Theme";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface pointofContactProps {
  errors: profileErrorState | null | undefined;
}

type paramState = pointOfContactParams | undefined;

export default forwardRef<
  { getData: () => companyFilesParams | undefined },
  pointofContactProps
>(({ errors }, ref) => {
  const userDetails = useSelector(getProfileInfo);
  const profile = { ...userDetails?.point_of_contact[0] };
  delete profile?.created_date;
  delete profile?.updated_date;
  const [params, setParams] = useState<paramState>(profile);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({ getData: () => params }));

  const handleTextChange = (
    key: keyof pointOfContactParams,
    value: string
  ) => {
    setParams({ ...params, [key]: value });
    dispatch(setError({ ...errors, [key]: "" }));
  };

  return (
    <>
      <TrText variant="semibold14" color="primary" marginVertical="l">
        POINT OF CONTACT
      </TrText>
      <CustomTextInput
        label="FIRST NAME"
        value={params?.first_name}
        onChangeText={(text) => handleTextChange("first_name", text)}
        errorMessage={errors?.first_name}
      />
      <CustomTextInput
        label="LAST NAME"
        value={params?.last_name}
        onChangeText={(text) => handleTextChange("last_name", text)}
        errorMessage={errors?.last_name}
      />

      <CustomTextInput
        label="DESIGNATION"
        value={params?.designation}
        onChangeText={(text) => handleTextChange("designation", text)}
        errorMessage={errors?.designation}
      />
      <PhoneNumberInput
        label="PHONE NUMBER"
        value={params?.phone}
        keyboardType="number-pad"
        onChangeText={(text) => handleTextChange("phone", text)}
        errorMessage={errors?.phone}
      />
      <CustomTextInput
        label="EMAIL ADDRESS"
        value={params?.email}
        onChangeText={(text) => handleTextChange("email", text)}
        errorMessage={errors?.email}
      />
    </>
  );
});
