import { network } from "@utils/HelperMethods";
import axios from "axios";
import { API_ROUTE } from "./serviceConstants";
import { getToken } from "@helpers/auth";
import { alert } from "@helpers/commonAlert";

export const apiMultiPart = axios.create({
  baseURL: API_ROUTE,
  timeout: 20000,
  validateStatus(status) {
    return status >= 200;
  },
});

apiMultiPart.interceptors.response.use(
  (res) => {
    alert(res);
    return res;
  },
  function (res) {
    network();
    console.log('[Scervice Error]', res);
  }
);

apiMultiPart.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers = {
    ...config.headers,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  return config;
});

const apiAuthenticator = axios.create({
  baseURL: API_ROUTE,
  timeout: 20000,
  validateStatus(status) {
    return status >= 200;
  },
});

apiAuthenticator.interceptors.response.use(
  (res) => {
    alert(res);
    return res;
  },
  (res) => {
    network();
    console.log('[Scervice Error]', res);
  }
);

apiAuthenticator.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return config;
});

export const apiGateway = axios.create({
  baseURL: API_ROUTE,
  timeout: 20000,
  validateStatus(status) {
    return status >= 200;
  },
});

export const apiSilentGateway = axios.create({
  baseURL: API_ROUTE,
  timeout: 20000,
  validateStatus(status) {
    return status >= 200;
  },
});

apiSilentGateway.interceptors.response.use(
  (res) => {
    return res;
  }
);

apiGateway.interceptors.response.use(
  (res) => {
    alert(res);
    return res;
  },
  (res) => {
    network();
    console.log('[Scervice Error]', res);
  }
);

apiGateway.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers = {
    ...config.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return config;
});

apiSilentGateway.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers = {
    ...config.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return config;
});

export default apiAuthenticator;
