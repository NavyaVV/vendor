type serverTypes = keyof typeof baseURLs;
export const server: serverTypes = "staging";

export const CryptoJsEncryptionKey = "CryptoJsEncryptionKey";

const baseURLs = {
  dev: { baseUrl: "http://localhost:3000" },
  staging: { baseUrl: "https://salefox-api.woodenclouds.in" },
  prod: { baseUrl: "https://salefox-api.woodenclouds.in" },
};

export const API_ROUTE = `${baseURLs[server].baseUrl}/`;
