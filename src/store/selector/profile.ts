import { State } from "@typings/State";
import { createSelector } from "reselect";

export const getProfile = (state: State) => state.profile;

export const getErrors = createSelector(getProfile, (profile) => profile.error);

export const getProfileInfo = createSelector(
  getProfile,
  (profile) => profile.profileView
);

export const getLoading = createSelector(
  getProfile,
  (profile) => profile.loading
);

export const getProfileCategories = createSelector(
  getProfile,
  (profile) => profile.categories
);
