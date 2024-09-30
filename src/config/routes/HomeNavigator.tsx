import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddProduct,
  ChangePassword,
  MyWallet,
  Product,
} from "@screens/regular";
import AddCampaigns from "@screens/regular/Campaigns/AddCampaigns/AddCampaigns";
import Campaign from "@screens/regular/Campaigns/Campaign";
import CouponsList from "@screens/regular/Payment/Coupons/CouponsList";
import OTPPayment from "@screens/regular/Payment/OTP.tsx/OTPPayment";
import Payment from "@screens/regular/Payment/Payment";
import AddPortfolio, {
  EditPortfolio,
} from "@screens/regular/Portfolio/AddPortfolio";
import Portfolio from "@screens/regular/Portfolio/Portfolios";
import { EditProfile } from "@screens/regular/Profiles";
import AddService from "@screens/regular/Service/AddServices/AddService";
import Services from "@screens/regular/Service/Services";
import { AppStackParamList } from "@typings/Navigation";
import React from "react";
import { ROUTES } from ".";
import TabNavigator from "./TabNavigator";

const HomeStack = createNativeStackNavigator<AppStackParamList>();

export default () => (
  <HomeStack.Navigator initialRouteName={ROUTES.TABS}>
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.TABS}
      component={TabNavigator}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.ADDPRODUCT}
      component={AddProduct}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.PRODUCT}
      component={Product}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.MYWALLET}
      component={MyWallet}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.SERVICES}
      component={Services}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.ADDSERVICES}
      component={AddService}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.PORTFOLIO}
      component={Portfolio}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.ADDCAMPAIGNS}
      component={AddCampaigns}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.ADDPORTFOLIO}
      component={AddPortfolio}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.EDITPORTFOLIO}
      component={EditPortfolio}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.EDITPROFILE}
      component={EditProfile}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.CHANGEPASSWORD}
      component={ChangePassword}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.CAMPAIGN}
      component={Campaign}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.PAYMENT}
      component={Payment}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.COUPONS}
      component={CouponsList}
    />
    <HomeStack.Screen
      options={{ headerShown: false }}
      name={ROUTES.OTPPayment}
      component={OTPPayment}
    />
  </HomeStack.Navigator>
);
