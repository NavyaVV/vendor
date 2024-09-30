/* eslint-disable @typescript-eslint/no-explicit-any */
import { endpoints } from "@config/serviceEndpoints";
import { setAlert } from "@store/reducers/common";
import { store } from "@store/store";
import { AxiosResponse } from "axios";

const success = {
  [endpoints.profileUpdate]: {
    success: 200,
    method: "patch",
    message: "Profile updated successfully",
  },
  [endpoints.service]: {
    success: 201,
    method: "post",
    // message: "Service added successfully",
  },
  [`${endpoints.service}id/`]: {
    success: 200,
    method: "patch",
    // message: "Service updated successfully",
  },
};

export const alert = (res: AxiosResponse<any, any>) => {
  try {
    const url =
      res.config.url?.includes(endpoints.service) && res.config.url.length > 20
        ? `${endpoints.service}id/`
        : endpoints.service;

    if (
      (url &&
        success[url]?.success === res.status &&
        success[url]?.method === res.config.method) || (res.status === 201 &&
          success[url]?.method === res.config.method)
    ) {
      // const message = success[url]?.message;
      const message = res.data?.message?.length ? res.data?.message : undefined;
      store.dispatch(setAlert({ alert: true, success: true, message }));
    } else if (res.data?.statusCode !== 200 && res.data?.statusCode !== 201) {
      const message = res.data?.message?.length ? res.data?.message : undefined;
      store.dispatch(setAlert({ alert: true, message }));
    }
  } catch (e) {
    console.log("[Error Alert] Exception: ", e);
  }
};
