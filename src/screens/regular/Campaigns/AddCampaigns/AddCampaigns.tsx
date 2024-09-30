import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  addCampaign,
  addSilentCampaign,
  editSilentCampaign,
  campaignsDetails,
  getCheckListLookup,
} from "@store/reducers/campaigns";
import {
  getCampaignDetails,
  getLoading,
  getCampaignProducts,
  getCampData,
} from "@store/selector/campaigns";
import { campaignProductsState } from "@typings/campaigns";
import { Box } from "@utils/Theme";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import AddForm from "./components/AddForm";
import BasicDetailsForm from "./components/BasicDetailsForm";
import LocationDetailForm from "./components/LocationDetailForm";
import Preview from "./components/Preview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@typings/Navigation";
import { getUserReferenceId } from "@store/selector/auth";
import { getAlert } from "@store/selector/common";
import { isEmpty } from "lodash";
// import { debounce } from "@utils/commonUtils";
import useDebounce from "@hooks/useDebounce";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";

export default ({
  route,
}: NativeStackScreenProps<AppStackParamList, ROUTES.ADDCAMPAIGNS>) => {
  const clientId = useAppSelector(getUserReferenceId);
  const campaignProducts = useAppSelector(getCampaignProducts);
  const campData = useAppSelector(getCampData);
  const focussed = useIsFocused();
  const loading = useAppSelector(getLoading);
  const [data, setData] = useState("Data1");
  const [showPopup, setShowPopup] = useState(false);
  const campaignDetail = route?.params?.item;
  const campaignDetailsInfo = useAppSelector(getCampaignDetails);
  const [campaignDatas, setCampaignDatas] = useState<any>({});
  const [campaignDataTemp, setCampaignDataTemp] = useState<any>({});
  const [campaignProductsList, setCampaignProductsList] =
    useState<campaignProductsState>(null);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const alert = useAppSelector(getAlert);

  useEffect(() => {
    if (alert?.success) {
      navigate(ROUTES.CAMPAIGNS);
    }
  }, [alert]);

  useEffect(() => {
    if (campaignProducts) {
      setCampaignProductsList(campaignProducts);
    }
  }, [campaignProducts]);

  useEffect(() => {
    if (campaignDetailsInfo && campaignDetail?.id) {
      let productCategory: {} = {}; // Initialize productCategory with an empty object
      if (campaignProductsList && campaignDetailsInfo?.products?.length) {
        const { category_list = [] } = campaignProductsList;
        productCategory = category_list.find(
          ({ id }) => id === campaignDetailsInfo?.products[0]?.category
        );
      }
      const selectedProduct = campaignDetailsInfo?.products?.map(
        ({ id }) => id
      );
      setCampaignDatas({
        ...campaignDetailsInfo,
        productCategory,
        products: selectedProduct,
        // portfolio: campaignDetailsInfo.portfolio?.value,
      });
    }
  }, [campaignDetailsInfo, campaignProducts]);

  useEffect(() => {
    if (focussed && campaignDetail?.id) {
      setCampaignDatas({});
      dispatch(campaignsDetails({ id: campaignDetail?.id }));
    }

    dispatch(getCheckListLookup());
  }, [dispatch, focussed]);

  const formFunctionality = (params: object, key: string, next: boolean) => {
    if (next) {
      setData(key);
      setCampaignDatas({ ...campaignDataTemp });
    } else {
      setCampaignDataTemp({ ...campaignDatas, ...params });
    }
  };

  useEffect(() => {
    autoSave();
  }, [campaignDataTemp]);

  const autoSave = useDebounce(() => {
    if (!isEmpty(campaignDataTemp)) {
      const campaignParams = {
        ...campaignDataTemp,
        vendor: clientId,
        campaignArea2: campaignDataTemp.campaignArea,
        xp: campaignDataTemp.estimatedPrice,
        listingPrice: campaignDataTemp.estimatedPrice,
        vendorFee: campaignDataTemp.estimatedPrice,
        fields: campaignDataTemp.fields?.map((item: any) => ({
          fieldType: item.field_type,
          name: item.field_name,
          isRequired: item.is_required,
        })),
        status: "DRAFT",
      };
      delete campaignParams.campaignArea;
      console.log("campaignParams :", campaignParams);
      if (campData?.id) {
        dispatch(editSilentCampaign({ id: campData.id, arg: campaignParams }));
      } else {
        dispatch(addSilentCampaign({ arg: campaignParams }));
      }
    }
  }, 1000);

  const handleSubmit = () => {
    const callback = () => navigation.goBack();
    Keyboard.dismiss();
    const campaignParams = {
      ...campaignDatas,
      // portfolio: campaignDatas?.portfolio?.value,
      vendor: clientId,
      campaignArea2: campaignDatas.campaignArea,
      xp: campaignDatas.estimatedPrice,
      listingPrice: campaignDatas.estimatedPrice,
      vendorFee: campaignDatas.estimatedPrice,
      fields: campaignDatas.fields?.map((item: any) => ({
        fieldType: item.field_type,
        name: item.field_name,
        isRequired: item.is_required,
      })),
      status: "LISTING",
    };
    delete campaignParams.campaignArea;
    dispatch(addCampaign({ arg: campaignParams, callback }));
  };

  let content;
  if (data === "Data1") {
    content = (
      <BasicDetailsForm
        onPressPrimeButton={(params, next = false) =>
          formFunctionality(params, "Data2", next)
        }
        onPressSecondButton={() => navigation.goBack()}
        // campaignDetailsInfo={campaignDetailsInfo}
        campaignProductsList={campaignProductsList}
        campaignDetail={campaignDetail}
        campaignDatas={campaignDatas}
      />
    );
  } else if (data === "Data2") {
    content = (
      <LocationDetailForm
        onPressPrimeButton={(params, next = false) =>
          formFunctionality(params, "Data3", next)
        }
        onPressSecondButton={() => setData("Data1")}
        // campaignDetailsInfo={campaignDetailsInfo}
        campaignDatas={campaignDatas}
      />
    );
  } else if (data === "Data3") {
    content = (
      <AddForm
        // campaignDetailsInfo={campaignDetailsInfo}
        campaignDatas={campaignDatas}
        onPressSecondButton={() => setData("Data2")}
        onPressPrimeButton={(params, next = false) => {
          setCampaignDataTemp({ ...campaignDatas, fields: params });
          if (next) {
            setCampaignDatas({ ...campaignDatas, fields: params });
            setData("Data4");
          }
        }}
      />
    );
  } else {
    content = (
      <Preview
        onPressPrimeButton={handleSubmit}
        onPressSecondButton={() => setData("Data3")}
        campaignPreviewData={campaignDatas}
        loader={loading === "pending"}
        popupVisibility={showPopup}
        onClosePopup={() => setShowPopup(false)}
        onConfirmPopup={() => {
          setShowPopup(false);
          navigation.goBack();
          // navigate(ROUTES.PAYMENT);
          // navigate(ROUTES.CAMPAIGNS);
        }}
      />
    );
  }

  const loadingCampaigns = () => {
    return loading === "pending" ? (
      <Box
        width="100%"
        height={100}
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator />
      </Box>
    ) : (
      <Box flex={1}>{content}</Box>
    );
  };

  return loadingCampaigns();
};
