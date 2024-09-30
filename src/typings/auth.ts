export interface tokenState {
  access_token: string;
  access_token_expiry: string;
}

export interface authCodeState {
  auth_code: string;
  access_token_expiry: string;
}

export interface AuthState {
  code?: string | null;
  username?: string;
  existingUser: boolean;
  clientId?: string | null;
  userReferenceId?: string | null;
  authCode?: authCodeState | null;
  token: tokenState | null | undefined;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error?: null | (loginErrorState & resetPwdErrorState);
  status?: "success" | "failure";
}

export interface loginParams {
  email?: string;
  phone?: string;
}

export interface resetPwdParams {
  password: string;
  confirmPassword?: string;
}

export interface loginErrorState {
  email?: Array<string> | string;
  phone?: Array<string> | string;
  otp?: Array<string> | string;
}

export interface resetPwdErrorState {
  password?: Array<string> | string;
  confirmPassword?: Array<string> | string;
}
