import apiAuthenticator, { apiMultiPart } from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const cardDetailsService = () =>
  apiAuthenticator.get(endpoints.cardDetails);

export const cardCouponService = () => apiAuthenticator.get(endpoints.coupons);

export const paymentSplitupService = () =>
  apiAuthenticator.get(endpoints.paymentSplitup);

export const couponValidateService = (params: Object) =>
  apiMultiPart.post(endpoints.couponsValidate, params);
