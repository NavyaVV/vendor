import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommonState, alertState, assetsState } from "@typings/common";
import {
  createAssetsService,
  deleteAssetsService,
} from "@config/services/common";

type Response = {
  reference_number?: string;
  file_name?: string;
  file_description?: string;
  file_type?: string;
  asset?: string;
  blob_data?: string;
  error?: object | null;
  alert?: object | null;
};

type Arguments = {
  reference_number?: string;
  file_name?: string;
  file_description?: string;
  file_type?: string;
  asset?: string;
};

const initialState: CommonState = {
  loading: null,
  alert: null,
  assetsData: null,
  error: null,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<alertState | null>) => {
      state.alert = action.payload;
    },
    clearAssets: (state, action: PayloadAction<assetsState | null>) => {
      state.assetsData = action.payload?.assetsData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAssets.fulfilled, (state, action) => {
      state.assetsData = action.payload;
      state.loading = false;
      state.alert = null;
    });
    builder.addCase(createAssets.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(createAssets.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
  },
});

export const createAssets = createAsyncThunk<Response, Arguments>(
  "common/createAssets",
  async (arg, { rejectWithValue }) => {
    try {
      console.log("arg.imageParams :", arg.imageParams);
      const res = await createAssetsService(arg.imageParams);
      if (res) {
        console.log("createAssets :", res);
        if (res?.data?.statusCode === 200) return res.data.result;
        else return rejectWithValue(res.data.error);
      } else return rejectWithValue(undefined);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const deleteAssets = createAsyncThunk<Response, Arguments>(
  "common/deleteAssets",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await deleteAssetsService(arg.imageParams);
      if (res?.data?.statusCode === 200) return res.data.result;
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const { clearAssets } = commonSlice.actions;

export const { setAlert } = commonSlice.actions;
export default commonSlice.reducer;
