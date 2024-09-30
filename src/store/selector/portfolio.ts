import { State } from "@typings/State";
import { createSelector } from "reselect";

export const getPortfolios = (state: State) => state.portfolio;

export const getPortfolioInfo = createSelector(
  getPortfolios,
  (portfolios) => portfolios.portfolioList
);

export const getLoading = createSelector(
  getPortfolios,
  (portfolios) => portfolios.loading
);

export const getCategories = createSelector(
  getPortfolios,
  (portfolios) => portfolios.portfolioCategory
);

export const getPortfolioProducts = createSelector(
  getPortfolios,
  (portfolios) => portfolios.products
);

export const getPortfolioServices = createSelector(
  getPortfolios,
  (portfolios) => portfolios.services
);

export const getErrors = createSelector(
  getPortfolios,
  (portfolios) => portfolios.error
);
