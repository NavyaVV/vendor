import Header from "@components/Header";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { couponValidate } from "@helpers/payment";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useIsFocused } from "@react-navigation/native";
import { couponDetails } from "@store/reducers/payment";
import { getCouponDetails } from "@store/selector/payment";
import { couponValidateParams } from "@typings/payment";
import { Box } from "@utils/Theme";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import CouponRenderFunction from "../components/CouponRenderFunction";
import CustomSearch from "../components/CustomSearch";

export default () => {
  const dispatch = useAppDispatch();
  const focussed = useIsFocused();
  const [value, setValue] = useState("");
  const couponInfo = useAppSelector(getCouponDetails);

  const [addCouponValidateData, setAddCouponValidateData] =
    useState<couponValidateParams>({
      coupon_code: value ?? "",
    });

  useEffect(() => {
    if (focussed) dispatch(couponDetails());
  }, [dispatch, focussed]);

  const renderCouponFunction = ({ item, index }) => {
    return (
      <CouponRenderFunction
        item={item}
        onPressCoupon={() => {
          setValue(item.coupon_code);
          navigate(ROUTES.PAYMENT, { item: item });
        }}
      />
    );
  };

  const handleApply = useCallback(async () => {
    const couponValidation = await couponValidate(addCouponValidateData);

    if (couponValidation.status === "success") navigate(ROUTES.PAYMENT);
  }, [addCouponValidateData]);

  const handleTextChange = (value: string, text: string) => {
    setAddCouponValidateData({ ...addCouponValidateData, [value]: text });
  };
  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="COUPONS FOR YOU" iconName="menu" />
      <FlatList
        data={couponInfo.results}
        renderItem={renderCouponFunction}
        ListHeaderComponent={
          <Box marginHorizontal="xxl">
            <CustomSearch
              placeholder="Search"
              onChangeText={(text) => {
                handleTextChange("coupon_code", text);
              }}
              value={value}
              label="APPLY"
              onPressLabel={handleApply}
            />
          </Box>
        }
      />
    </Box>
  );
};
