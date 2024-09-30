import {
  addCampaignService,
  campaignChecklistsService,
  campaignDetailsService,
  campaignEditService,
  addSilentCampaignService,
  campaignService,
  campaignsPaginationService,
  campaignProductServices,
  checkListLookupServices,
  campaignEditSilentService,
  vendorCampaignListing,
} from "@config/services/campaigns";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  campaignDetailState,
  campaignResponseItemState,
  CampaignState,
  filterParamsState,
  campaignProductsState,
} from "@typings/campaigns";

const initialState: CampaignState = {
  loading: "idle",
  error: null,
  campaignsList: null,
  campaignProducts: null,
  campaignPreview: undefined,
  campaignsDetails: null,
  addedCampaignData: undefined,
  newCampData: undefined,
  campaignChecklistLookup: null,
};

type Response = {
  newCampData: any;
  campaignChecklistLookup: any;
  campaignProducts: any;
  campaignData?: campaignResponseItemState | null;
  campaignsDetailsData?: campaignDetailState | null;
  error?: object | null;
};

type Arguments = {
  params?: object;
  offset?: number;
  limit?: number;
  url?: string;
  id?: any;
};

type Argument = {
  id?: string;
  arg: object;
  callback?: () => void;
};

export const campaignListing = createAsyncThunk<
  Response,
  (Arguments & filterParamsState) | undefined
>("campaign/campaignsListing", async (params, { rejectWithValue }) => {
  try {
    const res = await campaignService({ ...params });
    if (res?.data?.statusCode === 200)
      return {
        campaignData: {
          count: res.data.data.totalCount,
          limit: res.data.data.meta.limit,
          previous: res.data.data.meta,
          results: res.data.data.campaigns,
        },
        error: null,
      };
    else return rejectWithValue(res.data.error);
  } catch (e) {
    return rejectWithValue(undefined);
  }
});

export const getVendorCampaignListing = createAsyncThunk<
  Response,
  (Arguments & filterParamsState) | undefined
>(
  "campaign/getVendorCampaignListing",
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const res = await vendorCampaignListing(id, params);
      if (res?.data?.statusCode === 200)
        return {
          campaignData: {
            count: res.data.data.totalCount,
            limit: res.data.data.meta.limit,
            previous: res.data.data.meta,
            results: res.data.data.campaign,
          },
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const campaignListPagination = createAsyncThunk<Response, Arguments>(
  "campaign/campaignsListPagination",
  async ({ url }, { rejectWithValue }) => {
    try {
      const res = await campaignsPaginationService(url ?? "");
      if (res?.data?.statusCode === 200)
        return {
          campaignData: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const addSilentCampaign = createAsyncThunk<Response, Argument>(
  "campaign/addSilentCampaign",
  async ({ arg }, { rejectWithValue }) => {
    try {
      const res = await addSilentCampaignService(arg);
      if (res?.data?.statusCode === 201) {
        return {
          newCampData: res.data.data.campaign,
          error: null,
        };
      } else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const editSilentCampaign = createAsyncThunk<
  Response,
  { id: any; arg: object }
>("campaign/editSilentCampaign", async ({ id, arg }, { rejectWithValue }) => {
  try {
    const res = await campaignEditSilentService(id, arg);
    if (res?.data?.statusCode === 200)
      return {
        error: null,
      };
    else return rejectWithValue(res.data.error);
  } catch (e) {
    return rejectWithValue(undefined);
  }
});

export const addCampaign = createAsyncThunk<Response, Argument>(
  "campaign/addCampaign",
  async ({ arg, callback }, { rejectWithValue }) => {
    try {
      const res = await addCampaignService(arg);
      if (res?.data?.statusCode === 201) {
        if (callback) callback();
        return {
          addedCampaignData: res.data.result,
          campaignSuccess: true,
          error: null,
        };
      } else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const campaignsDetails = createAsyncThunk<Response, Arguments>(
  "campaign/campaignDetails",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await campaignDetailsService(id);
      const listRes = await campaignChecklistsService(id);
      if (res?.data?.statusCode === 200) {
        const checklists =
          listRes?.data?.data?.campaignField?.map(
            ({ name }: { name: string }) => name
          ) ?? [];
        return {
          campaignsDetailsData: { ...res.data.data.campaign, checklists },
          error: null,
        };
      } else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(undefined);
    }
  }
);

export const editCampaign = createAsyncThunk<
  Response,
  { id: string; arg: object }
>("campaign/editCampaign", async ({ id, arg }, { rejectWithValue }) => {
  try {
    const res = await campaignEditService(id, arg);
    if (res?.data?.statusCode === 200)
      return {
        editedPortfolioData: res.data.result,
        error: null,
      };
    else return rejectWithValue(res.data.error);
  } catch (e) {
    return rejectWithValue(undefined);
  }
});

export const getCampaignProduct = createAsyncThunk<Response, undefined>(
  "campaign/campaignProduct",
  async (_, { rejectWithValue }) => {
    try {
      const res = await campaignProductServices();
      if (res?.data?.statusCode === 200)
        return {
          campaignProducts: {
            count: res.data.result.count,
            category_list: res.data.result.category_list,
            results: res.data.result.results,
          },
          // campaignChecklistLookup: null, // Add the missing property
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const getCheckListLookup = createAsyncThunk<Response, undefined>(
  "campaign/campaignChecklistLookup",
  async (_, { rejectWithValue }) => {
    try {
      const res = await checkListLookupServices();
      if (res?.data?.statusCode === 200) {
        const {
          data: {
            data: { campaignChecklist = [] },
          },
        } = res;
        return {
          campaignChecklistLookup: [...campaignChecklist],
          // campaignProducts: res.data.result, // Add the 'campaignProducts' property
          error: null,
        };
      } else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

const campaignSlice = createSlice({
  name: "campaignSlice",
  initialState,
  reducers: {
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // product Listing
    builder.addCase(getCheckListLookup.fulfilled, (state, action) => {
      state.campaignChecklistLookup = action.payload.campaignChecklistLookup;
      state.loading = "succeeded";
    });
    builder.addCase("UPDATE_NEW_CAMP_DATA", (state) => {
      state.newCampData = null;
      state.loading = "succeeded";
    });
    builder.addCase(getCheckListLookup.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getCheckListLookup.rejected, (state) => {
      state.loading = "failed";
      state.error = "something went wrong";
    });

    builder.addCase(getCampaignProduct.fulfilled, (state, action) => {
      state.campaignProducts = action.payload.campaignProducts;
      state.loading = "succeeded";
    });
    builder.addCase(getCampaignProduct.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getCampaignProduct.rejected, (state) => {
      state.loading = "failed";
      state.error = "something went wrong";
    });

    // Campaign Listing
    builder.addCase(campaignListing.fulfilled, (state, action) => {
      state.campaignsList = action.payload.campaignData;

      state.loading = "idle";
    });
    builder.addCase(campaignListing.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(campaignListing.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });

    // Campaign Listing
    builder.addCase(getVendorCampaignListing.fulfilled, (state, action) => {
      state.campaignsList = action.payload.campaignData;

      state.loading = "idle";
    });
    builder.addCase(getVendorCampaignListing.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getVendorCampaignListing.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });

    //campaigns pagination list
    builder.addCase(campaignListPagination.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.campaignsList = {
        ...action.payload.campaignData,
        results: [
          ...(state.campaignsList?.results ?? []),
          ...(action.payload.campaignData?.results ?? []),
        ],
      };
    });
    builder.addCase(campaignListPagination.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(addSilentCampaign.fulfilled, (state, action) => {
      state.loading = "idle";
      state.newCampData = action.payload.newCampData;
    });
    // Add Campaign
    builder.addCase(addCampaign.fulfilled, (state) => {
      state.loading = "idle";
    });
    builder.addCase(addCampaign.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addCampaign.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });

    // Campaign Details
    builder.addCase(campaignsDetails.fulfilled, (state, action) => {
      state.campaignsDetails = action.payload.campaignsDetailsData;

      state.loading = "idle";
    });
    builder.addCase(campaignsDetails.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(campaignsDetails.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });
    // Campaign Edit
    builder.addCase(editCampaign.fulfilled, (state) => {
      state.loading = "idle";
    });
    builder.addCase(editCampaign.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editCampaign.rejected, (state) => {
      state.loading = "idle";
      state.error = "something went wrong";
    });
  },
});

export const { setError } = campaignSlice.actions;
export default campaignSlice.reducer;
