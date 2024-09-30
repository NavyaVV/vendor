import { LinkingOptions } from "@react-navigation/native";
import React from "react";

export const navigationRef: any = React.createRef();

export function navigate(name: string, params?: any): void {
  navigationRef.current?.navigate(name, params);
}

export const linking: LinkingOptions<{}> = {
  prefixes: [],
  config: {
    screens: {
      App: {
        screens: {
          Home: {
            path: "home",
          },
        },
      },
    },
  },
};

export const links = [
  "dashboard",
  "wallet",
  "swap",
  "borrow",
  "earn",
  "fiveMinBinary",
];
