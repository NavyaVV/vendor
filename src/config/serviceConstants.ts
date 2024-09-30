type serverTypes = keyof typeof baseURLs;
export const server: serverTypes = "staging";

export const CryptoJsEncryptionKey = "CryptoJsEncryptionKey";

const baseURLs = {
  dev: { baseUrl: "http://localhost:3000" },
  staging: { baseUrl: "https://sfx.eastus.cloudapp.azure.com" },
  prod: { baseUrl: "https://sfx.eastus.cloudapp.azure.com" },
};

export const API_ROUTE = `${baseURLs[server].baseUrl}/`;
