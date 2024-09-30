import CustomAutoSearch from "@components/CustomAutoSearch";
import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import Dropdown from "@components/Dropdown";
import Header from "@components/Header";
import TextArea from "@components/TextArea";
import { ROUTES } from "@config/routes";
import { addServiceValidation } from "@helpers/service";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  addService,
  editService,
  serviceType,
  setError,
} from "@store/reducers/service";
import { getErrors, getLoading, getServiceType } from "@store/selector/service";
import { AppStackParamList } from "@typings/Navigation";
import {
  addServiceParams,
  locationParams,
  serviceParams,
} from "@typings/service";
import { Box, KeyboardAvoidingBox } from "@utils/Theme";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getAlert } from "@store/selector/common";
import { navigate } from "@config/NavigationHelper";

export default ({
  route,
}: NativeStackScreenProps<AppStackParamList, ROUTES.ADDSERVICES>) => {
  const { goBack } = useNavigation();
  const errors = useAppSelector(getErrors);
  const loading = useAppSelector(getLoading);
  const serviceTypeInfo = useAppSelector(getServiceType);
  const serviceDetail = route.params?.item?.service;
  const isEditService = !!serviceDetail?.id;
  const [formData, setFormData] = useState<addServiceParams>({});
  const dispatch = useAppDispatch();

  const alert = useAppSelector(getAlert);
  useEffect(() => {
    if (alert?.success) {
      navigate(ROUTES.PORTFOLIO);
    }
  }, [alert]);

  const area = formData?.service_loc?.length
    ? formData?.service_loc[0].area
    : undefined;

  useEffect(() => {
    if (route.params?.item) setFormData(route.params?.item);
    dispatch(serviceType());
  }, [dispatch, route.params?.item]);

  const handleSubmit = () => {
    const validation = addServiceValidation(formData);
    dispatch(setError(validation.errorMsg));
    if (!validation.status) {
      const callback = goBack;
      const params = { id: serviceDetail?.id, arg: formData, callback };
      if (isEditService) dispatch(editService(params));
      else dispatch(addService(params));
    }
  };

  const handleTextChange = (
    key: keyof serviceParams | "service_loc",
    value: string | number | locationParams
  ) => {
    dispatch(setError({ ...errors, [key]: null }));
    const data =
      typeof value !== "string" && typeof value !== "number"
        ? { service_loc: [value] }
        : { service: { ...formData.service, [key]: value } };
    setFormData({ ...formData, ...data });
  };

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="ADD SERVICE" iconName="menu" />
      <KeyboardAvoidingBox
        flex={1}
        flexDirection="column"
        justifyContent="center"
        behavior="padding"
        enabled
      >
        <ScrollView keyboardShouldPersistTaps>
          <Box marginHorizontal="xxl" marginTop="xxl" marginBottom="xl">
            <CustomTextInput
              label="SERVICE NAME"
              value={formData.service?.service_name}
              mandatory={true}
              onChangeText={(text) => handleTextChange("service_name", text)}
              errorMessage={errors?.service_name}
            />
            <Dropdown
              label="TYPE OF SERVICE"
              labelField="type_name"
              valueField="id"
              dropdownData={serviceTypeInfo}
              value={formData.service?.service_type}
              setCategory={(text) => handleTextChange("service_type", text)}
              errorMessage={errors?.service_type}
            />
            <CustomAutoSearch
              label="SERVICE AREA"
              mandatory={true}
              placeHolder={area}
              errorMessage={errors?.service_loc}
              onSelect={(location) => handleTextChange("service_loc", location)}
            />
            <CustomTextInput
              label="PRICE"
              mandatory={true}
              value={formData.service?.price?.toString()}
              onChangeText={(text) =>
                handleTextChange("price", parseInt(text, 10))
              }
              errorMessage={errors?.price}
              keyboardType="number-pad"
              iconLeftName="inrCurrency"
            />
            <TextArea
              label="SHORT DESCRIPTION"
              placeHolder="Desc"
              mBottom="xx3l"
              mHeight={150}
              value={formData.service?.description}
              onChangeText={(text) => handleTextChange("description", text)}
            />
            <CustomButton
              label={isEditService ? "SAVE CHANGES" : "ADD SERVICE"}
              onPress={handleSubmit}
              loading={loading === "pending"}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingBox>
    </Box>
  );
};
