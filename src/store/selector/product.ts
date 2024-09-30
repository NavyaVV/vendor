import { State } from "@typings/State";
import { createSelector } from "reselect";

export const getProducts = (state: State) => state.product;

export const getProductsAssets = createSelector(
  getProducts,
  (products) => products.productsList
);
export const getProductInfo = createSelector(
  getProducts,
  (products) => products.productsList
);

export const getLoading = createSelector(
  getProducts,
  (products) => products.loading
);

export const getErrors = createSelector(
  getProducts,
  (products) => products.error
);

export const getProductCategoryInfo = createSelector(
  getProducts,
  (products) => products.productCategory
);

export const getProductDetails = createSelector(
  getProducts,
  (products) => products.productDetails
);
