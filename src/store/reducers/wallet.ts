import {
  transactionPaginationService,
  transactionService,
  walletService,
} from "@config/services/wallet";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  transactionResponseItemState,
  walletResponseItemState,
  WalletState,
} from "@typings/wallet";

const initialState: WalletState = {
  loading: "idle",
  error: null,
  walletView: null,
  transactionList: null,
};

type Response = {
  walletData?: walletResponseItemState | null;
  transactionData?: transactionResponseItemState | null;
  error?: object | null;
};

type Arguments = {
  limit: number;
  url: string;
};

export const walletView = createAsyncThunk<Response>(
  "wallet/walletView",
  async (_, { rejectWithValue }) => {
    try {
      const res = await walletService();
      if (res?.data?.statusCode === 200)
        return {
          walletData: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const transactionListing = createAsyncThunk<Response, { limit: number }>(
  "transaction/transactionsListing",
  async ({ limit }: { limit: number }, { rejectWithValue }) => {
    try {
      const res = await transactionService({ limit });
      if (res?.data?.statusCode === 200)
        return {
          transactionData: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const transactionListPagination = createAsyncThunk<
  Response,
  { url: string }
>(
  "transaction/transactionsListPagination",
  async ({ url }: { url: string }, { rejectWithValue }) => {
    try {
      const res = await transactionPaginationService(url);
      if (res?.data?.statusCode === 200)
        return {
          transactionData: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

const walletSlice = createSlice({
  name: "walletSlice",
  initialState,
  reducers: {
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Wallet View
    builder.addCase(walletView.fulfilled, (state, action) => {
      state.walletView = action.payload.walletData;

      state.loading = "idle";
    });
    builder.addCase(walletView.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(walletView.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });
    // transaction Listing
    builder.addCase(transactionListing.fulfilled, (state, action) => {
      state.transactionList = action.payload.transactionData;

      state.loading = "idle";
    });
    builder.addCase(transactionListing.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(transactionListing.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });

    //transactions pagination list
    builder.addCase(transactionListPagination.fulfilled, (state, action) => {
      state.loading = "idle";
      state.transactionList = {
        ...action.payload.transactionData,
        results: [
          ...(state.transactionList?.results ?? []),
          ...(action.payload.transactionData?.results ?? []),
        ],
      };
    });
  },
});

export const { setError } = walletSlice.actions;
export default walletSlice.reducer;
