import apiAuthenticator, { apiGateway } from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const walletService = () => apiAuthenticator.get(endpoints.wallet);

export const transactionService = (params: Object) =>
  apiAuthenticator.get(endpoints.transactionHistory, { params });

export const transactionPaginationService = (url: string) =>
  apiGateway.get(url);
