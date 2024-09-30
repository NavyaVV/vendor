import {
  authCodeVerificationScervice,
  loginService,
  otpVerificationService,
} from "@config/services/auth";
import { generateRandomCode } from "@helpers/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State } from "@typings/State";
import {
  AuthState,
  authCodeState,
  loginErrorState,
  tokenState,
} from "@typings/auth";
import DeviceInfo from "react-native-device-info";
import sha256 from "crypto-js/sha256";

const initialState: AuthState = {
  existingUser: false,
  clientId: null,
  userReferenceId: null,
  token: null,
  loading: "idle",
  error: null,
  status: "failure",
};

type Response = {
  userReferenceId: string | null | undefined;
  code?: string;
  clientId?: string | null;
  token?: tokenState | null;
  error?: object | null;
  authCode?: authCodeState;
  status?: "success" | "failure";
};

type Arguments = {
  callback?: (token?: string) => void;
  username?: string;
  otp?: string;
};

type Reject = {
  state: State;
  rejectValue: null | loginErrorState;
};

export const login = createAsyncThunk<Response, Arguments, Reject>(
  "auth/login",
  async ({ username, callback }, { rejectWithValue }) => {
    try {
      const device_unique_id = await DeviceInfo.getUniqueId();
      const device_details = { device_unique_id };
      const res = await loginService({ username, device_details });
      if (res?.data?.statusCode === 200) {
        console.log("res?.data :", res?.data);
        if (callback) callback();
        return {
          clientId: res.data.result?.client_id,
          userReferenceId: res.data.result?.user_reference_id,
          error: null,
        };
      } else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const verifyOtp = createAsyncThunk<Response, Arguments, Reject>(
  "auth/otp",
  async ({ otp }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const client_id = auth.clientId;
      const code = generateRandomCode(50);
      const code_challenge = sha256(code).toString();
      const params = { otp, client_id, code_challenge };
      const otpRes = await otpVerificationService(params);
      if (otpRes.data?.statusCode === 200) {
        const authCode = otpRes.data.result;
        const auth_code = authCode?.auth_code;
        const authParams = { auth_code, plain_code: code, client_id };
        const authRes = await authCodeVerificationScervice(authParams);
        if (authRes.data?.statusCode === 200)
          return {
            code,
            authCode,
            token: authRes.data.result,
            userReferenceId: auth.userReferenceId,
          };
        else return rejectWithValue(authRes.data?.error);
      } else return rejectWithValue(otpRes.data?.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const refreshToken = createAsyncThunk<Response, Arguments, Reject>(
  "auth/refresh",
  async ({ callback }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const code = auth.code;
      const authCode = auth.authCode;
      const auth_code = authCode?.auth_code;
      const client_id = auth.clientId;
      const authParams = { auth_code, plain_code: code, client_id };
      const res = await authCodeVerificationScervice(authParams);
      if (res?.data?.statusCode === 200) {
        if (callback) callback(res.data.result?.access_token);
        return { token: res.data.result };
      } else {
        return rejectWithValue(res.data?.error);
      }
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = null;
      return token;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStatus: (state) => {
      state.status = "failure";
    },
  },
  extraReducers: (builder) => {
    // Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    // Login
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("action.payload :", action.payload);
      state.clientId = action.payload.clientId;
      state.existingUser = true;
      state.userReferenceId = action.payload.userReferenceId;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "idle";
      state.token = null;
    });

    // OTP
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.authCode = action.payload.authCode;
      state.token = action.payload.token;
      state.code = action.payload.code;
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "idle";
      state.token = null;
    });

    // Refresh
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = "idle";
      state.token = null;
    });
  },
});

export const { setError, setStatus } = authSlice.actions;
export default authSlice.reducer;
