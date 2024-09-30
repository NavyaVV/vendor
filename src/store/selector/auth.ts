import { State } from "@typings/State";
import { createSelector } from "reselect";

export const getAuth = (state: State) => state.auth;

export const getToken = createSelector(getAuth, (auth) => auth.token);

export const getClientId = createSelector(getAuth, (auth) => auth.clientId);

export const getUserReferenceId = createSelector(getAuth, (auth) => auth.userReferenceId);

export const getLoading = createSelector(getAuth, (auth) => auth.loading);

export const getStatus = createSelector(getAuth, (auth) => auth.status);

export const getErrors = createSelector(getAuth, (auth) => auth.error);

export const getExistingUser = createSelector(
  getAuth,
  (auth) => auth.existingUser
);
