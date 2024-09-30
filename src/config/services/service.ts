import { apiGateway } from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const servicesService = (params: object) =>
  apiGateway.get(endpoints.service, {
    params: { ...params, timestamp: new Date().getTime() },
  });

export const servicesPaginationService = (url: string) => apiGateway.get(url);

export const servicesAddService = (params: object) =>
  apiGateway.post(endpoints.service, params);

export const servicesTypeService = () => apiGateway.get(endpoints.serviceType);

export const serviceDetailsService = (id: string) =>
  apiGateway.get(`${endpoints.service}${id}`);

export const serviceEditService = (id: string, params: object) =>
  apiGateway.patch(`${endpoints.service}${id}/`, params);

export const serviceDeleteService = (id: string) =>
  apiGateway.delete(`${endpoints.service}${id}/`);
