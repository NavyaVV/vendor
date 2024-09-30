import {
  cardCouponService,
  cardDetailsService,
  paymentSplitupService,
} from "@config/services/payment";
import { cardDetailsResponseState, PaymentState } from "@typings/payment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: PaymentState = {
  loading: "idle",
  error: null,
  paymentDetails: null,
  couponDetails: [],
  paymentBreakupDetails: [],
};

type Response = {
  paymentSplitupData: any;
  couponData: any;
  cardData?: cardDetailsResponseState | null;
  error?: object | null;
};
type Arguments = {
  limit: number;
  url: string;
};

export const cardDetails = createAsyncThunk<Response>(
  "card/cardDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cardDetailsService();
      if (res?.data?.statusCode === 200)
        return {
          cardData: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const couponDetails = createAsyncThunk<Response>(
  "coupon/couponDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cardCouponService();
      if (res?.data?.statusCode === 200)
        return {
          couponData: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const paymentSplitupDetails = createAsyncThunk<Response>(
  "payment/paymentSplitupDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await paymentSplitupService();
      if (res?.data?.statusCode === 200)
        return {
          paymentSplitupData: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Card Details
    builder.addCase(cardDetails.fulfilled, (state, action) => {
      state.paymentDetails = action.payload.cardData;

      state.loading = "idle";
    });
    builder.addCase(cardDetails.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(cardDetails.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });
    // Coupon Details
    builder.addCase(couponDetails.fulfilled, (state, action) => {
      state.couponDetails = action.payload.couponData;

      state.loading = "idle";
    });
    builder.addCase(couponDetails.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(couponDetails.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });

    // Payment Breakup Details
    builder.addCase(paymentSplitupDetails.fulfilled, (state, action) => {
      state.paymentBreakupDetails = action.payload.paymentSplitupData;

      state.loading = "idle";
    });
    builder.addCase(paymentSplitupDetails.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(paymentSplitupDetails.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });
  },
});

export const { setError } = paymentSlice.actions;
export default paymentSlice.reducer;
