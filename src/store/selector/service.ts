import { State } from "@typings/State";
import { createSelector } from "reselect";

export const getServices = (state: State) => state.service;

export const getServiceInfo = createSelector(
  getServices,
  (services) => services.serviceList
);

export const getLoading = createSelector(
  getServices,
  (services) => services.loading
);

export const getErrors = createSelector(
  getServices,
  (services) => services.error
);

export const getServiceType = createSelector(
  getServices,
  (services) => services.serviceType
);
export const getServiceDetails = createSelector(
  getServices,
  (services) => services.serviceDetails
);
