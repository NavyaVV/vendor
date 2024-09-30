import Header from "@components/Header";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { useAppDispatch } from "@hooks/redux";
import { useIsFocused } from "@react-navigation/native";
import { cardDetails } from "@store/reducers/payment";
import { Box } from "@utils/Theme";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import PaymentMethod from "./components/PaymentMethod";
import PaymentPopup from "./components/PaymentPopup";
import SavedCards from "./components/SavedCards";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@typings/Navigation";

export default ({
  route,
}: NativeStackScreenProps<AppStackParamList, ROUTES.PAYMENT>) => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useAppDispatch();
  const focussed = useIsFocused();
  const couponDetails = route?.params?.item;

  // useEffect(() => {
  //   if (focussed) dispatch(cardDetails());
  // }, [dispatch, focussed]);

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="PAYMENT" iconName="menu" />
      <ScrollView>
        <SavedCards />
        <PaymentMethod
          onPressPrimeButton={() => setShowPopup(true)}
          onPressSecondButton={() => setShowPopup(true)}
          couponDetails={couponDetails}
        />
        <PaymentPopup
          visible={showPopup}
          close={() => setShowPopup(false)}
          onPress={(value) => {
            setShowPopup(false);
            navigate(ROUTES.OTPPayment, { value: value });
          }}
        />
      </ScrollView>
    </Box>
  );
};
