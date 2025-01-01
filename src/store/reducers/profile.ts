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

// Fetch profile data
export const profileView = createAsyncThunk<Response, undefined, Reject>(
  "profile/profileView",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Calling profileService...");
      const res = await profileService();
      console.log("profileView res?.data :", res?.data);

      if (res?.data?.statusCode === 200) {
        const cat = await profileCategoryService();
        console.log("profileView cat :", cat);

        return {
          profileData: res.data.result,
          profileCategory: cat.data.result,
          error: null,
        };
      } else {
        return rejectWithValue({
          message: res?.data?.result?.[0] || "An unknown error occurred.",
        });
      }
    } catch (e) {
      console.error("Error fetching profile:", e);
      return rejectWithValue({ message: "Failed to fetch profile data." });
    }
  }
);

// Edit profile data
export const editProfile = createAsyncThunk<Response, Arguments, Reject>(
  "profile/editProfile",
  async ({ arg }, { rejectWithValue, dispatch, getState }) => {
    try {
      // Before submitting - capture the current profile state
      const currentProfile = getState().profile; // Assuming 'profile' is the state slice holding profile info
      console.log("Before submitting payroll: ", currentProfile);

      // Make the API request to edit the profile
      console.log("Editing profile...");
      const res = await profileEditService(arg);
      console.log("editProfile res :", res);

      // If the response is successful, dispatch a refresh and return the updated profile
      if (res?.data?.statusCode === 200) {
        dispatch(profileView()); // Refresh profile after edit
        const updatedProfile = res.data.result; // New profile data

        // Log the updated profile (after submitting payroll)
        console.log("After submitting payroll: ", updatedProfile);

        return {
          editedProfileData: updatedProfile,
          error: null,
        };
      } else {
        return rejectWithValue({
          message: res?.data?.error || "Failed to edit profile.",
        });
      }
    } catch (e) {
      console.error("Error editing profile:", e);
      return rejectWithValue({ message: "Failed to edit profile." });
    }
  }
);

// Slice definition
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
      state.categories = action.payload.profileCategory || [];
      state.loading = "idle";
      state.error = null; // Clear previous errors
    });
    builder.addCase(profileView.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(profileView.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.message || "An error occurred.";
    });

    // Profile Edit
    builder.addCase(editProfile.fulfilled, (state) => {
      state.loading = "succeeded";
      state.error = null; // Clear previous errors
    });
    builder.addCase(editProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.message || "Failed to edit profile.";
    });
  },
});

export const { setError } = profileSlice.actions;
export default profileSlice.reducer;
