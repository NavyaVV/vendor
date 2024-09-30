import { createSelector } from "@reduxjs/toolkit";
import { State } from "@typings/State";

export const getCommon = (state: State) => state.common;

export const getLoader = createSelector(getCommon, (common) => common.loader);

export const getAlert = createSelector(getCommon, (common) => common.alert);

export const getAssets = createSelector(getCommon, (common) => common.assetsData);
