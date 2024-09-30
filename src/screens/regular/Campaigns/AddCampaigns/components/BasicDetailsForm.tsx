import { useEffect } from "react";
import CustomDoubleButton from "@components/CustomDoubleButton";
import CustomTextInput from "@components/CustomTextInput";
import Dropdown from "@components/Dropdown";
import DropdownMultiSelect from "@components/DropdownMultiSelect";
import Header from "@components/Header";
import PickCalender from "@components/PickCalender";
import SelectType from "@components/SelectType";
import TextArea from "@components/TextArea";
import { addCampaignsValidation } from "@helpers/campaigns";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { getPortfolioInfo } from "@store/selector/portfolio";
import { setError } from "@store/reducers/campaigns";
import {
  campaignDetailState,
  createCampaignParams,
  portfolioListDropState,
  campaignProductsState,
} from "@typings/campaigns";
import { data4 } from "@utils/FilterDummyData";
import { Box, Text, TrText } from "@utils/Theme";
import moment from "moment";
import React, { useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import DatePicker from "react-native-date-picker";
import ProgressIndicator from "./ProgressIndicator";

export interface OptionProps {
  // campaignDetailsInfo: campaignDetailState | null | undefined;
  campaignDatas: any;
  campaignDetail: any;
  campaignProductsList: campaignProductsState | null | undefined;
  onPressPrimeButton: (params: object, next: boolean) => void;
  onPressSecondButton: () => void;
}

export default ({
  onPressPrimeButton,
  onPressSecondButton,
  // campaignDetailsInfo,
  campaignProductsList,
  campaignDatas,
  campaignDetail,
}: OptionProps) => {
  const [chooseStartDate, setChooseStartDate] = useState(false);
  const [chooseEndDate, setChooseEndDate] = useState(false);
  const [expiry, setExpiry] = useState(true);
  const [portfolioData, setPortfolioData] = useState<portfolioListDropState[]>(
    []
  );
  const [errorMsg, setErrorMsg] = useState<createCampaignParams>({});
  const [productsCategory, setProductsCategory] = useState([]);
  const [campaignProducts, setCampaignProducts] = useState([]);

  const portfolio = useAppSelector(getPortfolioInfo);

  useEffect(() => {
    if (campaignProductsList) {
      const { results, category_list = [] } = campaignProductsList;
      setProductsCategory(category_list);
      const productList = results?.map(({ product }) => {
        return product;
      });
      setCampaignProducts([...productList]);
    }
  }, [campaignProductsList]);

  useEffect(() => {
    if (portfolio?.results) {
      setPortfolioData(
        portfolio?.results.map((item) => {
          return {
            data: item?.portfolioName,
            value: item?.id,
          } as portfolioListDropState;
        })
      );
    }
  }, [portfolio]);

  const [createCampaignsData, setCreateCampaignsData] =
    useState<createCampaignParams>({
      startDate: new Date().toString(),
      endDate: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toString(),
    });

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   onPressPrimeButton(createCampaignsData);
  // }, [createCampaignsData]);
  useEffect(() => {
    console.log("campaignDatas :", campaignDatas);
    setCreateCampaignsData({
      name: campaignDatas?.name,
      // campaignType: campaignDetailsInfo?.campaignType ?? "Marketing Campaign",
      campaignType: "Marketing Campaign",
      // portfolio: campaignDetailsInfo?.portfolio,
      duration: campaignDatas?.duration,
      additionalInfo: campaignDatas?.additionalInfo,
      productCategory: campaignDatas?.productCategory,
      products: campaignDatas?.products,
      startDate: campaignDatas?.id
        ? moment(campaignDatas?.startDate).toString()
        : new Date().toString(),
      endDate: campaignDatas?.id
        ? moment(campaignDatas?.endDate).toString()
        : new Date(new Date().setDate(new Date().getDate() + 1)).toString(),
    });
    if (campaignDatas?.duration) {
      setExpiry(campaignDatas?.duration > 0 ? false : true);
    }
  }, [campaignDatas, campaignProductsList]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    const validation = addCampaignsValidation(createCampaignsData);
    setErrorMsg(validation.errorMsg);
    if (!validation.status) onPressPrimeButton(createCampaignsData, true);
  };

  const handleTextChange = (
    key: keyof createCampaignParams,
    text: string | number
  ) => {
    setErrorMsg({ ...errorMsg, [key]: null });
    dispatch(setError);
    const params = { ...createCampaignsData, [key]: text };
    onPressPrimeButton({ ...params }, false);
    setCreateCampaignsData({ ...params });
  };

  // const handlePortfolio = (
  //   item: any
  // ) => {
  //   setCreateCampaignsData({ ...createCampaignsData, portfolio: item });
  // };
  const handleCampaignType = (item: any) => {
    const params = { ...createCampaignsData, campaignType: item };
    onPressPrimeButton({ ...params }, false);
    setCreateCampaignsData({ ...params });
  };

  const handleCampaignProductType = (item: any) => {
    const params = {
      ...createCampaignsData,
      productCategory: item,
      products: [],
    };
    onPressPrimeButton({ ...params }, false);
    setCreateCampaignsData({
      ...params,
    });
  };

  const handleCampaignProduct = (item: any) => {
    const params = { ...createCampaignsData, products: item };
    onPressPrimeButton({ ...params }, false);
    setCreateCampaignsData({ ...params });
  };

  const renderProduct = () => {
    const productsList = campaignProducts.filter(
      ({ product_category, id, product_name }) => {
        if (
          (createCampaignsData?.productCategory as { id: string })?.id ===
          product_category
        ) {
          return {
            id: id,
            name: product_name,
          };
        }
      }
    );
    return (
      <DropdownMultiSelect
        mandatory
        value={createCampaignsData?.products || []}
        setCategory={(item) => handleCampaignProduct(item)}
        label="CAMPAIGN PRODUCTS"
        dropdownData={productsList}
        labelField="label"
        valueField="id"
        errorMessage={errorMsg.products}
      />
    );
  };

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header
        headerTrText={`${campaignDatas?.id ? "UPDATE" : "CREATE"} CAMPAIGNS`}
        iconName="menu"
      />
      <ScrollView
        style={{ marginHorizontal: 22 }}
        showsVerticalScrollIndicator={false}
      >
        <ProgressIndicator
          serialNo1={1}
          serialNo2={2}
          serialNo3={3}
          serialNo4={4}
          setBg={1}
        />
        <CustomTextInput
          mandatory
          label="CAMPAIGN NAME"
          value={createCampaignsData?.name}
          placeholder="Campaign Name"
          onChangeText={(text) => handleTextChange("name", text)}
          errorMessage={errorMsg.name}
        />
        <Dropdown
          mandatory
          value={"1"}
          setCategory={(text, item) => handleCampaignType(item)}
          label="CAMPAIGN TYPE"
          dropdownData={[{ id: "1", label: "Marketing Campaign" }]}
          labelField="label"
          valueField="id"
          errorMessage={errorMsg.portfolio}
        />
        <Dropdown
          mandatory
          value={createCampaignsData.productCategory}
          setCategory={(text, item) => handleCampaignProductType(item)}
          label="CAMPAIGN PRODUCT CATEGORY"
          dropdownData={productsCategory}
          labelField="category_name"
          valueField="id"
          errorMessage={errorMsg.productCategory}
        />
        {renderProduct()}
        {/* <Dropdown
          mandatory
          value={createCampaignsData.portfolio}
          setCategory={(text, item) => handlePortfolio(item)}
          label="SELECT PORTFOLIO"
          dropdownData={portfolioData}
          labelField="data"
          valueField="data"
          errorMessage={errorMsg.portfolio}
        /> */}
        <Box borderWidth={1} borderColor="secondary" flex={1} marginTop="xxl">
          <Box flexDirection="row">
            <TrText variant="regular12" marginBottom="m" color="textColor05">
              CAMPAIGN START DATE
            </TrText>
            <Text color="textColor03"> *</Text>
          </Box>
          <PickCalender
            onPress={() => setChooseStartDate(!chooseStartDate)}
            date={
              createCampaignsData.startDate
                ? moment(createCampaignsData.startDate).format("DD-MM-YYYY")
                : ""
            }
          />
          <DatePicker
            modal
            mode="date"
            open={chooseStartDate}
            date={new Date(createCampaignsData.startDate ?? "")}
            onConfirm={(date) =>
              handleTextChange("startDate", date?.toString())
            }
            onCancel={() => setChooseStartDate(false)}
          />
          <Box height={15} marginTop="_s">
            <Text
              variant="regular12"
              color="textColorRed2"
              paddingHorizontal="m"
            >
              {errorMsg?.startDate ?? ""}
            </Text>
          </Box>
          <Box>
            <SelectType
              label="CAMPAIGN EXPIRY"
              data={["END DATE", "DURATION"]}
              selectedIndex={expiry ? 0 : 1}
              onSelect={(i) => {
                setExpiry(i === 0);
                if (i === 0) handleTextChange("duration", 0);
              }}
            />
          </Box>
          <Box>
            {expiry === true ? (
              <>
                <Box flexDirection="row">
                  <TrText
                    variant={"regular12"}
                    marginBottom="m"
                    color="textColor05"
                  >
                    CAMPAIGN END DATE
                  </TrText>
                  <Text color="textColor03"> *</Text>
                </Box>

                <Box marginBottom="x2l">
                  <PickCalender
                    onPress={() => setChooseEndDate(!chooseEndDate)}
                    date={moment(createCampaignsData.endDate).format(
                      "DD-MM-YYYY"
                    )}
                  />
                </Box>
                <DatePicker
                  modal
                  mode="date"
                  open={chooseEndDate}
                  date={new Date(createCampaignsData.endDate ?? "")}
                  onConfirm={(date) =>
                    handleTextChange("endDate", date.toString())
                  }
                  onCancel={() => setChooseEndDate(false)}
                />
              </>
            ) : (
              <>
                <Dropdown
                  value={createCampaignsData.duration}
                  setCategory={(text) => {
                    const end_date = moment(createCampaignsData.startDate)
                      .add("days", text)
                      .format("YYYY-MM-DD");
                    handleTextChange("duration", text);
                    handleTextChange("endDate", end_date.toString());
                  }}
                  label="CAMPAIGN DURATION"
                  dropdownData={data4}
                  labelField="data"
                  valueField="value"
                  mandatory={true}
                  errorMessage={errorMsg.duration}
                />
              </>
            )}
            <TextArea
              label="ADDITIONAL INFORMATION"
              mHeight={150}
              value={createCampaignsData?.additionalInfo ?? ""}
              onChangeText={(text) => handleTextChange("additionalInfo", text)}
            />
          </Box>

          <CustomDoubleButton
            primaryButton="NEXT"
            secondaryButton="BACK"
            onPressPrimary={handleSubmit}
            onPressSecondary={onPressSecondButton}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};
