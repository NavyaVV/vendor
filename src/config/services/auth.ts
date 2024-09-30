import apiAuthenticator from "@config/service";
import { endpoints } from "@config/serviceEndpoints";

export const loginService = (params: object) =>
  apiAuthenticator.post(endpoints.login, params);

export const forgotPasswordService = (params: object) =>
  apiAuthenticator.post(endpoints.forgotPassword, params);

export const otpVerificationService = (params: object) =>
  apiAuthenticator.post(endpoints.verifyOtp, params);

export const authCodeVerificationScervice = (params: object) =>
  apiAuthenticator.post(endpoints.verifyAuthCode, params);

export const resetPasswordService = (params: object) =>
  apiAuthenticator.post(endpoints.resetPassword, params);
