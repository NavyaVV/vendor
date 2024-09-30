import { State } from "@typings/State";
import { createSelector } from "reselect";

export const getPayment = (state: State) => state.payment;

export const getCardDetails = createSelector(
  getPayment,
  (payment) => payment.paymentDetails
);

export const getCouponDetails = createSelector(
  getPayment,
  (payment) => payment.couponDetails
);

export const getPaymentBreakupDetails = createSelector(
  getPayment,
  (payment) => payment.paymentBreakupDetails
);
