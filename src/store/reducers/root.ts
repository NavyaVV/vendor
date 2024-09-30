import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import campaignReducer from "./campaigns";
import profileReducer from "./profile";
import portfolioReducer from "./portfolio";
import serviceReducer from "./service";
import productReducer from "./product";
import walletReducer from "./wallet";
import paymentReducer from "./payment";
import commonReducer from "./common";

const rootReducer = combineReducers({
  auth: authReducer,
  campaign: campaignReducer,
  profile: profileReducer,
  portfolio: portfolioReducer,
  service: serviceReducer,
  product: productReducer,
  wallet: walletReducer,
  payment: paymentReducer,
  common: commonReducer,
});

export default rootReducer;
