import { apiGateway } from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const portfolioService = async (params: object) =>
  await apiGateway.get(endpoints.portfolio, { params });

export const addPortfolioService = async (params: object) =>
  await apiGateway.post(endpoints.portfolio, params);

export const portfolioCategoryList = async () =>
  await apiGateway.get(endpoints.portfolioCategory);

export const portfolioProductList = async (params: object) =>
  await apiGateway.get(endpoints.portfolioProduct, params);

export const portfolioServiceList = async (params: object) =>
  await apiGateway.get(endpoints.portfolioService, params);

export const portfolioDetailsService = async (id: string) =>
  await apiGateway.get(`${endpoints.portfolio}/${id}`);

export const portfolioEditService = async (id: number, params: object) =>
  await apiGateway.put(`${endpoints.portfolio}${id}`, params);

export const portfolioAddEntry = async (params: object) =>
  await apiGateway.patch(endpoints.addPortfolioEntity, params);

export const portfolioRemoveEntry = async (params: object) =>
  await apiGateway.patch(endpoints.removePortfolioEntity, params);

export const portfolioDeleteService = async (id: string | undefined) =>
  await apiGateway.delete(`${endpoints.portfolio}/${id}`);
