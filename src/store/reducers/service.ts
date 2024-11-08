import {
  serviceDetailsService,
  serviceEditService,
  servicesAddService,
  servicesPaginationService,
  servicesService,
  servicesTypeService,
} from "@config/services/service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State } from "@typings/State";
import {
  servicesState,
  ServiceState,
  serviceTypesState,
  addServiceParams,
  serviceDetailsState,
  addServiceErrorState,
  serviceListParams,
} from "@typings/service";
import { Alert } from "react-native";

const initialState: ServiceState = {
  loading: "idle",
  error: null,
  serviceList: null,
  serviceType: undefined,
  serviceDetails: null,
};

type Response = {
  serviceData?: servicesState | null;
  servicesTypes?: Array<serviceTypesState>;
  serviceDetails?: serviceDetailsState | null;
  error?: object | null;
};

type Arguments = {
  url?: string;
  id?: string;
  arg?: addServiceParams | serviceListParams;
  callback?: () => void;
};

type Reducer = {
  state: State;
  rejectValue: null | addServiceErrorState;
};

export const serviceListing = createAsyncThunk<Response, Arguments, Reducer>(
  "services/serviceListing",
  async ({ arg, callback }, { rejectWithValue }) => {
    console.log(arg, 'service listingg');
    
    try {
      const res = await servicesService(arg ?? {});
      if (res?.data?.statusCode === 200) {
        callback && callback();
        console.log(res?.data?.result, 'service listingg');
        return {
          serviceData: res.data.result,
          error: null,
        };
      } else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const servicesListPagination = createAsyncThunk<
  Response,
  Arguments,
  Reducer
>("services/serviceListPagination", async ({ url }, { rejectWithValue }) => {
  try {
    if (url) {
      const res = await servicesPaginationService(url);
      if (res?.data?.statusCode === 200)
        return {
          serviceData: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } else return rejectWithValue(null);
  } catch (e) {
    return rejectWithValue(null);
  }
});


export const addService = createAsyncThunk<Response, Arguments, Reducer>(
  "services/addService",
  async ({ arg, callback }, { rejectWithValue, dispatch }) => {
    try {
      if (arg) {
        console.log("Data being sent to API:", arg); // Log the data being sent
        const res = await servicesAddService(arg);
        console.log("API Response:", res);

        if (res?.data?.statusCode === 200) {
          if (callback) callback(); // Execute callback if provided
          Alert.alert("Success", "Service added successfully!", [{ text: "OK" }]);
          return {
            addedServiceData: res.data.result,
            error: null,
          };
        } else {
          console.error("Error Response:", res?.data);  // Log the complete error response

          return rejectWithValue(res.data.error);
        }
      } else {
        console.warn("No argument provided to addService");
        return rejectWithValue(null);
      }
    } catch (e) {
      console.error("Caught error in addService:", e); // Detailed log for error inspection
      return rejectWithValue(e.response?.data?.message || "An unexpected error occurred");
    }
  }
);




export const serviceType = createAsyncThunk<Response, undefined, Reducer>(
  "service/serviceType",
  async (_, { rejectWithValue }) => {
    try {
      const res = await servicesTypeService();
      if (res?.data?.statusCode === 200)
        return {
          servicesTypes: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const serviceDetails = createAsyncThunk<Response, string, Reducer>(
  "service/serviceDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await serviceDetailsService(id);
      if (res?.data?.statusCode === 200)
        return {
          serviceDetails: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const editService = createAsyncThunk<Response, Arguments, Reducer>(
  "service/editService",
  async ({ id, arg }, { rejectWithValue, dispatch }) => {
    try {
      if (id && arg) {
        const res = await serviceEditService(id, arg);
        if (res?.data?.statusCode === 200) {
          const arg = { limit: 50, ordering: "-updated_date" };
          dispatch(serviceListing({ arg }));
          return {
            editedServiceData: res.data.result,
            error: null,
          };
        } else return rejectWithValue(res.data.error);
      } else return rejectWithValue(null);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Service Listing
    builder.addCase(serviceListing.fulfilled, (state, action) => {
      state.serviceList = action.payload.serviceData;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(serviceListing.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(serviceListing.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload ?? null;
    });

    //service pagination list
    builder.addCase(servicesListPagination.fulfilled, (state, action) => {
      state.error = null;
      state.loading = "idle";
      state.serviceList = {
        ...action.payload.serviceData,
        results: [
          ...(state.serviceList?.results ?? []),
          ...(action.payload.serviceData?.results ?? []),
        ],
      };
    });
    builder.addCase(servicesListPagination.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(servicesListPagination.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload ?? null;
    });

    // Add Service
    builder.addCase(addService.fulfilled, (state) => {
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(addService.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addService.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload ?? null;
    });

    // Service Type listing
    builder.addCase(serviceType.fulfilled, (state, action) => {
      state.serviceType = action.payload.servicesTypes;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(serviceType.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(serviceType.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload ?? null;
    });

    // Service Details
    builder.addCase(serviceDetails.fulfilled, (state, action) => {
      state.serviceDetails = action.payload.serviceDetails;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(serviceDetails.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(serviceDetails.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload ?? null;
    });

    // Service Edit
    builder.addCase(editService.fulfilled, (state) => {
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(editService.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editService.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload ?? null;
    });
  },
});

export const { setError } = serviceSlice.actions;
export default serviceSlice.reducer;
