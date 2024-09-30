import { apiGateway, apiMultiPart } from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const profileService = () => apiGateway.get(endpoints.profile);

export const profileCategoryService = () =>
  apiGateway.get(endpoints.profileCategory);

export const profileEditService = (params: object | undefined | null) =>
  apiGateway.patch(endpoints.profileUpdate, params);
