import { ROUTES } from "@config/routes";
import { portfolioListState } from "./portfolio";
import { serviceListState } from "./service";
import { campaignListState } from "./campaigns";

export type RootStackParamList = {
  [ROUTES.APP]: HomeStackParamList;
  [ROUTES.AUTH]: AuthStackParamList;
  [ROUTES.HOME]: AppStackParamList;
};

export type HomeStackParamList = {
  [ROUTES.HOME]: AppStackParamList;
};
export type AppStackParamList = {
  [ROUTES.TABS]: AppTabParamList;
  [ROUTES.ADDPRODUCT]: undefined;
  [ROUTES.PRODUCT]: undefined;
  [ROUTES.SERVICES]: undefined;
  [ROUTES.ADDSERVICES]: { item?: serviceListState };
  [ROUTES.ADDCAMPAIGNS]: { editCampaign?: boolean; item?: campaignListState };
  [ROUTES.MYWALLET]: undefined;
  [ROUTES.PORTFOLIO]: undefined;
  [ROUTES.ADDPORTFOLIO]: undefined;
  [ROUTES.EDITPORTFOLIO]: { item: portfolioListState };
  [ROUTES.EDITPROFILE]: undefined;
  [ROUTES.CHANGEPASSWORD]: undefined;
  [ROUTES.CAMPAIGN]: { id: number | string };
  [ROUTES.PAYMENT]: undefined;
  [ROUTES.COUPONS]: undefined;
  [ROUTES.OTPPayment]: undefined;
};

export type AppTabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.CAMPAIGNS]: undefined;
  [ROUTES.PRODUCTS]: undefined;
  [ROUTES.PROFILE]: undefined;
};

export type AuthStackParamList = {
  [ROUTES.LANDING]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.CONTACT]: undefined;
  [ROUTES.FORGOTPASSWORD]: undefined;
  [ROUTES.OTP]: { username?: string };
  [ROUTES.RESETPASSWORD]: { token: string };
  [ROUTES.EMAILLOGIN]: undefined;
  [ROUTES.PHONELOGIN]: undefined;
};
