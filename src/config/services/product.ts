import { apiGateway } from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const productService = (params: object) =>
  apiGateway.get(endpoints.product, {
    params: { ...params, timestamp: new Date().getTime() },
  });

export const productPaginationService = (url: string) => apiGateway.get(url);

export const addProductService = (params: object) =>
  apiGateway.post(endpoints.addProduct, params);

export const productCategoryService = () =>
  apiGateway.get(endpoints.productCategory);

export const productDetailsService = (id: number | string) =>
  apiGateway.get(`${endpoints.product}${id}/`);

export const productEditService = (id: string, params: object) =>
  apiGateway.patch(`${endpoints.product}${id}/`, params);

export const productDeleteService = (id: string) =>
  apiGateway.delete(`${endpoints.deleteProduct}${id}/`);
