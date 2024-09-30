import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  profileCategoryState,
  profileErrorState,
  profileParams,
  profileState,
  ProfileState,
} from "@typings/profile";
import {
  profileService,
  profileEditService,
  profileCategoryService,
} from "@config/services/profile";

const initialState: ProfileState = {
  loading: "idle",
  error: null,
  profileView: null,
  categories: [],
};

type Response = {
  profileData?: profileState | null;
  profileCategory?: Array<profileCategoryState>;
  error?: object | null;
};

type Arguments = {
  id?: string;
  arg?: profileParams | null;
};

type Reject = {
  rejectValue: null | profileErrorState;
};

export const profileView = createAsyncThunk<Response, undefined, Reject>(
  "profile/profileView",
  async (_, { rejectWithValue }) => {
    try {
      const res = await profileService();
      console.log("profileView res?.data :", res?.data);
      const cat = await profileCategoryService();
      console.log("profileView cat :", cat);
      if (res?.data?.statusCode === 200)
        return {
          profileData: res.data.result,
          profileCategory: cat.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

export const editProfile = createAsyncThunk<Response, Arguments, Reject>(
  "profile/editProfile",
  async ({ arg }, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileEditService(arg);
      console.log("editProfile res :", res);
      if (res?.data?.statusCode === 200) {
        dispatch(profileView());
        return {
          editedProfileData: res.data.result,
          error: null,
        };
      } else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Profile View
    builder.addCase(profileView.fulfilled, (state, action) => {
      state.profileView = action.payload.profileData;
      state.categories = action.payload.profileCategory;
      state.loading = "idle";
    });
    builder.addCase(profileView.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(profileView.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Profile Edit
    builder.addCase(editProfile.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(editProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
  },
});

export const { setError } = profileSlice.actions;
export default profileSlice.reducer;
