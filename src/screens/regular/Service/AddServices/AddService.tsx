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
import { getUserReferenceId } from "@store/selector/auth";

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
  const clientId = useAppSelector(getUserReferenceId);
  const alert = useAppSelector(getAlert);


  console.log(clientId, 'clientidd');
  
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
      // Add user field to formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: clientId,
      }));
    }, [dispatch, route.params?.item, clientId]);
    


    const handleSubmit = async () => {
      console.log("Submit button pressed", formData);
    
      // Form validation
      const validation = addServiceValidation(formData);
      console.log("Validation result:", validation);
    
      if (!validation.status) {
        console.log("Validation failed:", validation.errorMsg);
        dispatch(setError(validation.errorMsg));
        return;
      }
    
      const payload = {
        service: {
          service_name: formData?.service?.service_name,
          service_type: formData?.service?.service_type,
          price: formData?.service?.price,
          description: formData?.service?.description,
          user: clientId,
        },
        service_loc: formData?.service_loc ? [
          {
            area: formData?.service_loc[0]?.area,
            city: formData?.service_loc[0]?.city,
            country: formData?.service_loc[0]?.country,
            district: formData?.service_loc[0]?.district,
            latitude: formData?.service_loc[0]?.latitude,
            longitude: formData?.service_loc[0]?.longitude,
            state: formData?.service_loc[0]?.state,
          }
        ] : [],
      };
    
      const callback = goBack;
      const params = {
        id: serviceDetail?.id,
        arg: payload,
        callback,
      };
    
      try {
        const response = isEditService
          ? await dispatch(editService(params)).unwrap()
          : await dispatch(addService(params)).unwrap();
    
        // Check if the response indicates a successful submission
        if (response?.statusCode === 201 && response?.status) {
          console.log("Data submitted successfully");
          goBack(); // Navigate back on successful submission
        } else {
          // Handle unexpected response structure or status
          const errorMsg = response?.message || "An unexpected error occurred";
          console.log("Unexpected response:", errorMsg);
          dispatch(setError(errorMsg));
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.message || "An unexpected error occurred";
        const statusCode = error?.response?.status;
        console.log("API error:", errorMsg, "Status Code:", statusCode);
        dispatch(setError(errorMsg));
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
        <ScrollView keyboardShouldPersistTaps="handled">
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
