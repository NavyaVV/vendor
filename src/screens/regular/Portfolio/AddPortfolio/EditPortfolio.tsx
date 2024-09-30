import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import Dropdown from "@components/Dropdown";
import Header from "@components/Header";
import SelectType from "@components/SelectType";
import TextArea from "@components/TextArea";
import { ROUTES } from "@config/routes";
import {
  addPortfolioValidation,
  mapPortfolioDetails,
} from "@helpers/portfolio";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  addEntity,
  editPortfolio,
  removeEntity,
  setError,
} from "@store/reducers/portfolio";
import {
  getErrors,
  getLoading,
  getCategories,
  getPortfolioProducts,
  getPortfolioServices,
} from "@store/selector/portfolio";
import { AppStackParamList } from "@typings/Navigation";
import { addPortfolioParams } from "@typings/portfolio";
import { Box } from "@utils/Theme";
import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import ProductService from "./components/ProductService";
import { getUserReferenceId } from "@store/selector/auth";

type inputsType = addPortfolioParams;

export default ({
  route,
}: NativeStackScreenProps<AppStackParamList, ROUTES.EDITPORTFOLIO>) => {
  const portfolioDetail = route.params?.item;
  const clientId = useAppSelector(getUserReferenceId);
  const error = useAppSelector(getErrors);
  const loading = useAppSelector(getLoading);
  const categories = useAppSelector(getCategories);
  const products = useAppSelector(getPortfolioProducts);
  const services = useAppSelector(getPortfolioServices);
  const [inputs, setInputs] = useState<inputsType>(
    mapPortfolioDetails(portfolioDetail)
  );
  const dispatch = useAppDispatch();

  const isService = inputs?.type === "Service";

  const handleSubmit = useCallback(() => {
    const arg = {
      type: inputs.type,
      category: inputs.category,
      description: inputs.description,
      portfolioName: inputs.portfolioName,
      isActive: true,
    };
    const validation = addPortfolioValidation(inputs);
    dispatch(setError(validation.errorMsg));
    const params = { id: portfolioDetail?.id, arg, clientId };
    if (!validation.status) dispatch(editPortfolio(params));
  }, [inputs, dispatch, portfolioDetail?.id]);

  const handleTextChange = (
    key: keyof inputsType,
    text: string | number | Array<number>
  ) => {
    setInputs({ ...inputs, [key]: text });
    dispatch(setError({ ...error, [key]: null }));
  };

  const handleAddAsset = (entityId: number) => {
    const key = isService ? "serviceIds" : "productIds";
    setInputs({ ...inputs, [key]: [...(inputs[key] ?? []), entityId] });
    const arg = { id: portfolioDetail.id, entityId, entityType: inputs?.type };
    dispatch(addEntity({ arg }));
  };

  const handleClearAsset = (entityId: number) => {
    const key = isService ? "serviceIds" : "productIds";
    const value = inputs[key]?.filter((item) => item !== entityId);
    setInputs({ ...inputs, [key]: value });
    const arg = { id: portfolioDetail.id, entityId, entityType: inputs?.type };
    dispatch(removeEntity({ arg }));
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
            data={["PRODUCT", "SERVICE"]}
            selectedIndex={isService ? 1 : 0}
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
            label={isService ? "SERVICES" : "PRODUCTS"}
            errorMessage={isService ? error?.serviceIds : error?.productIds}
            selected={isService ? inputs?.serviceIds : inputs?.productIds}
            onClear={handleClearAsset}
            onChange={handleAddAsset}
          />
          <TextArea
            mTop="xxxl"
            mHeight={150}
            label="SHORT DESCRIPTION"
            value={inputs?.description}
            onChangeText={(text) => handleTextChange("description", text)}
          />
          <CustomButton
            label="SAVE CHANGES"
            onPress={handleSubmit}
            loading={loading === "pending"}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};
