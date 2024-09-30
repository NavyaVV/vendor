import { apiGateway, apiMultiPart, apiSilentGateway } from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const campaignService = (params: object) =>
  apiGateway.get(endpoints.campaign, { params });

export const vendorCampaignListing = (id: any, params: any) =>
  apiGateway.get(`${endpoints.campaignVendor}/${id}`, { params });

export const campaignsPaginationService = (url: string) => apiGateway.get(url);

export const addCampaignService = (params: object) =>
  apiGateway.post(endpoints.campaign, params);

export const addSilentCampaignService = (params: object) =>
  apiSilentGateway.post(endpoints.campaign, params);

export const campaignDetailsService = (id: string | number | undefined) =>
  apiGateway.get(`${endpoints.campaign}${id}/`);

export const campaignChecklistsService = (id: string | number | undefined) =>
  apiGateway.get(`${endpoints.campaign}${id}/field/`);

export const campaignEditService = (id: string | undefined, params: object) =>
  apiMultiPart.patch(`${endpoints.campaign}${id}/`, params);

export const campaignEditSilentService = (id: string | undefined, params: object) =>
  apiSilentGateway.patch(`${endpoints.campaign}${id}/`, params);

export const campaignDeleteService = (id: string | undefined) =>
  apiGateway.delete(`${endpoints.campaign}/${id}`);

export const campaignProductServices = () =>
  apiGateway.get(endpoints.businessProducts);

export const checkListLookupServices = () =>
  apiGateway.get(endpoints.checklistLookup);
