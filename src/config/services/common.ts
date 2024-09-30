import { apiGateway } from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const createAssetsService = (params: object) =>
  apiGateway.post(endpoints.createAssets, params);

export const deleteAssetsService = (params: object) =>
  apiGateway.post(endpoints.deleteAssets, params);