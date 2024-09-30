import {
  addPortfolioService,
  portfolioAddEntry,
  portfolioCategoryList,
  portfolioDetailsService,
  portfolioEditService,
  portfolioProductList,
  portfolioRemoveEntry,
  portfolioService,
  portfolioServiceList,
} from "@config/services/portfolio";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  categoryState,
  portfolioDetailsState,
  portfolioErrorState,
  portfolioProductState,
  portfolioResponseItemState,
  portfolioServiceState,
  PortfolioState,
} from "@typings/portfolio";
import { State } from "@typings/State";

const initialState: PortfolioState = {
  loading: "idle",
  error: null,
  portfolioList: null,
  portfolioDetails: null,
};

type Response = {
  portfolioData?: portfolioResponseItemState | null;
  portfolioDetails?: portfolioDetailsState | null;
  portfolioCategory?: Array<categoryState> | null;
  services?: Array<portfolioServiceState> | null;
  products?: Array<portfolioProductState> | null;
  error?: object | null;
};

type Arguments = {
  limit?: number;
  page?: number;
  arg?: object;
};

type Args = {
  arg: object;
  callback?: () => void;
};

type Reducer = {
  state: State;
  rejectValue: null | portfolioErrorState;
};

type ProductService = {
  venderId?: string | number;
};

type Reject = {
  rejectValue: null | portfolioErrorState;
};

export const portfolioListing = createAsyncThunk<Response, Arguments, Reject>(
  "portfolio/portfolioListing",
  async (params, { rejectWithValue }) => {
    try {
      const res = await portfolioService({ ...params, loadEntity: true });
      if (res?.data?.statusCode === 200)
        return {
          portfolioData: {
            count: res.data.data.meta.totalCount,
            limit: res.data.data.meta.limit,
            page: res.data.data.meta.page,
            results: res.data.data.allPortFolio,
          },
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const portfolioListPagination = createAsyncThunk<
  Response,
  Arguments,
  Reject
>("portfolio/portfolioListPagination", async (params, { rejectWithValue }) => {
  try {
    const res = await portfolioService({ ...params, loadEntity: true });

    if (res?.data?.statusCode === 200)
      return {
        portfolioData: {
          count: res.data.data.meta.totalCount,
          limit: res.data.data.meta.limit,
          page: res.data.data.meta.page,
          results: res.data.data.allPortFolio,
        },
      };
    return rejectWithValue(null);
  } catch (e) {
    return rejectWithValue(null);
  }
});

export const portfolioCategory = createAsyncThunk<Response, undefined, Reject>(
  "portfolio/portfolioCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await portfolioCategoryList();

      if (res?.data?.statusCode === 200)
        return {
          portfolioCategory: res.data.data.portfolioCategory,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const getPortfolioServiceProductList = createAsyncThunk<
  Response,
  ProductService,
  Reject
>(
  "portfolio/getPortfolioServiceProductList",
  async (params, { rejectWithValue }) => {
    try {
      const products = await portfolioProductList({ vendorId: params.venderId });
      const services = await portfolioServiceList({ vendorId: params.venderId });

      if (
        products.data?.statusCode === 200 &&
        services.data?.statusCode === 200
      )
        return {
          error: null,
          services: services.data.data.service,
          products: products.data.data.products,
        };
      return rejectWithValue(null);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const portfolioDetails = createAsyncThunk<Response, string, Reject>(
  "portfolio/portfolioDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await portfolioDetailsService(id);

      if (res?.data?.statusCode === 200)
        return {
          portfolioDetails: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const addPortfolio = createAsyncThunk<Response, Args, Reducer>(
  "portfolio/addPortfolio",
  async ({ arg, callback }, { rejectWithValue }) => {
    try {
      const res = await addPortfolioService(arg);
      if (res?.data?.statusCode === 200 || (res?.data?.statusCode === 201 && res?.data?.error === null)) {
        if (callback) callback();
        return {
          addedPortfolioData: res.data.result,
          error: null,
        };
      }
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const editPortfolio = createAsyncThunk<
  Response,
  { id: number; arg: object },
  Reject
>(
  "portfolio/editPortfolio",
  async ({ id, arg, clientId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await portfolioEditService(id, arg);
      if (res?.data?.statusCode === 200) {
        dispatch(portfolioListing({ limit: 50, page: 1, vendorId: clientId }));
        return {
          editedPortfolioData: res.data.result,
          error: null,
        };
      }
      return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const addEntity = createAsyncThunk<Response, Arguments, Reject>(
  "portfolio/addEntity",
  async ({ arg }, { rejectWithValue }) => {
    try {
      if (arg) {
        const res = await portfolioAddEntry(arg);

        if (res?.data?.statusCode === 200)
          return {
            editedPortfolioData: res.data.result,
            error: null,
          };
      }
      return rejectWithValue(null);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const removeEntity = createAsyncThunk<Response, Arguments, Reject>(
  "portfolio/removeEntity",
  async ({ arg }, { rejectWithValue }) => {
    try {
      if (arg) {
        const res = await portfolioRemoveEntry(arg);

        if (res?.data?.statusCode === 200)
          return {
            editedPortfolioData: res.data.result,
            error: null,
          };
      }
      return rejectWithValue(null);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const deletePortfolio = createAsyncThunk<Response, Arguments, Reject>(
  "portfolio/deletePortfolio",
  async (_, { rejectWithValue }) => {
    try {
      return rejectWithValue(null);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolioSlice",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Portfolio Listing
    builder.addCase(portfolioListing.fulfilled, (state, action) => {
      state.portfolioList = action.payload.portfolioData;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(portfolioListing.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(portfolioListing.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    //portfolio pagination list
    builder.addCase(portfolioListPagination.fulfilled, (state, action) => {
      state.error = null;
      state.loading = "idle";
      state.portfolioList = {
        ...action.payload.portfolioData,
        results: [
          ...(state.portfolioList?.results ?? []),
          ...(action.payload.portfolioData?.results ?? []),
        ],
      };
    });
    builder.addCase(portfolioListPagination.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(portfolioListPagination.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Add Portfolio
    builder.addCase(addPortfolio.fulfilled, (state) => {
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(addPortfolio.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(addPortfolio.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Portfolio Category listing
    builder.addCase(portfolioCategory.fulfilled, (state, action) => {
      state.portfolioCategory = action.payload.portfolioCategory;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(portfolioCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(portfolioCategory.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Portfolio Product/Service listing
    builder.addCase(
      getPortfolioServiceProductList.fulfilled,
      (state, action) => {
        state.products = action.payload.products;
        state.services = action.payload.services;
        state.loading = "idle";
        state.error = null;
      }
    );
    builder.addCase(getPortfolioServiceProductList.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(
      getPortfolioServiceProductList.rejected,
      (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      }
    );

    // Portfolio Details
    builder.addCase(portfolioDetails.fulfilled, (state, action) => {
      state.portfolioDetails = action.payload.portfolioDetails;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(portfolioDetails.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(portfolioDetails.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Portfolio Edit
    builder.addCase(editPortfolio.fulfilled, (state) => {
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(editPortfolio.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(editPortfolio.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
  },
});

export const { setError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
