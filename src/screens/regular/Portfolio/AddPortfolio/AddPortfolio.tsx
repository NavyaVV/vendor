import { useEffect } from "react";
import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import Dropdown from "@components/Dropdown";
import Header from "@components/Header";
import SelectType from "@components/SelectType";
import TextArea from "@components/TextArea";
import { addPortfolioValidation } from "@helpers/portfolio";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { addPortfolio, setError } from "@store/reducers/portfolio";
import {
  getCategories,
  getErrors,
  getLoading,
  getPortfolioProducts,
  getPortfolioServices,
} from "@store/selector/portfolio";
import { addPortfolioParams } from "@typings/portfolio";
import { Box } from "@utils/Theme";
import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import ProductService from "./components/ProductService";
import { getUserReferenceId } from "@store/selector/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@typings/Navigation";
import { getAlert } from "@store/selector/common";
import { ROUTES } from "@config/routes";
import { navigate } from "@config/NavigationHelper";
import { useNavigation } from "@react-navigation/native";
import AlertPopup from "@components/AlertPopup";

type inputsType = addPortfolioParams;

export default ({
  route,
}: NativeStackScreenProps<AppStackParamList, ROUTES.ADDPORTFOLIO>) => {
  const services = useAppSelector(getPortfolioServices);
  const error = useAppSelector(getErrors);
  const loading = useAppSelector(getLoading);
  const products = useAppSelector(getPortfolioProducts);
  const categories = useAppSelector(getCategories);
  const clientId = useAppSelector(getUserReferenceId);
  const [showPopup, setShowPopup] = useState(false);
  const [inputs, setInputs] = useState<inputsType>({
    type: 0,
    vendorId: clientId || "",
  });
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation();

  const alert = useAppSelector(getAlert);

  useEffect(() => {
    if (alert?.success) {
      navigate(ROUTES.PORTFOLIO);
    }
  }, [alert]);

  const isService = inputs?.type === 1;
  const selectedEntities = isService ? inputs?.serviceIds : inputs?.productIds;

  const handleSubmit = useCallback(() => {
    const callback = () => goBack();
    const validation = addPortfolioValidation(inputs);
    dispatch(setError(validation.errorMsg));
    if (inputs?.type === 0) {
      delete inputs.serviceIds;
      inputs.type = "Product";
    }
    if (inputs?.type === 1) {
      delete inputs?.productIds;
      inputs.type = "Service";
    }
    const arg = { ...inputs, vendorId: clientId };
    if (!validation.status) dispatch(addPortfolio({ arg, callback }));
  }, [inputs, dispatch]);

  const handleTextChange = (
    key: keyof inputsType,
    text: string | number | Array<number>
  ) => {
    const copyInputs = inputs;
    if (key === "type") {
      if (text === "0") delete inputs?.serviceIds;
      if (text === "1") delete inputs?.productIds;
    }
    setInputs({ ...copyInputs, [key]: text });
    dispatch(setError({ ...error, [key]: null }));
  };

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="PORTFOLIO" iconName="menu" />
      <ScrollView>
        <Box margin="xxl">
          <CustomTextInput
            mandatory
            label="PORTFOLIO NAME"
            value={inputs?.portfolioName}
            onChangeText={(text) => handleTextChange("portfolioName", text)}
            errorMessage={error?.portfolioName}
          />
          <SelectType
            label="TYPE"
            data={["Product", "Service"]}
            selectedIndex={inputs?.type ? 1 : 0}
            onSelect={(type) => handleTextChange("type", type)}
          />
          <Dropdown
            mandatory
            dropPosition="bottom"
            value={inputs?.category}
            label="SELECT CATEGORY"
            dropdownData={categories ?? []}
            labelField="name"
            valueField="id"
            errorMessage={error?.category}
            setCategory={(category) => handleTextChange("category", category)}
          />
          <ProductService
            services={services ?? []}
            products={products ?? []}
            label={inputs?.type === 1 ? "SERVICES" : "PRODUCTS"}
            errorMessage={isService ? error?.serviceIds : error?.productIds}
            selected={selectedEntities}
            onChange={(id) => {
              handleTextChange(isService ? "serviceIds" : "productIds", [
                ...(selectedEntities ?? []),
                id,
              ]);
            }}
            onClear={(id) => {
              if (selectedEntities?.length)
                handleTextChange(
                  isService ? "serviceIds" : "productIds",
                  selectedEntities?.filter((state) => state !== id)
                );
            }}
          />
          <TextArea
            label="SHORT DESCRIPTION"
            value={inputs?.description}
            mTop="xxxl"
            mHeight={150}
            onChangeText={(text) => handleTextChange("description", text)}
          />
          <CustomButton
            label="ADD PORTFOLIO"
            onPress={handleSubmit}
            loading={loading === "pending"}
          />
          <AlertPopup
            type="Success"
            onConfirm={goBack}
            visible={showPopup}
            onClose={() => setShowPopup(false)}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};
