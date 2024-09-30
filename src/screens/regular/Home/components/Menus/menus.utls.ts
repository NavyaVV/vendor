import { ROUTES } from "@config/routes";
import { menuItemProps } from "./Menu";

export const menus: Array<menuItemProps> = [
  {
    name: "PRODUCTS",
    iconName: "products",
    count: null,
    color: "boxColor19",
    iconColor: "primary",
    navigationPath: ROUTES.PRODUCTS,
  },
  {
    name: "SERVICES",
    iconName: "services",
    count: null,
    color: "boxColor07",
    iconColor: "boxColor11",
    navigationPath: ROUTES.SERVICES,
  },
  // {
  //   name: "PORTFOLIO",
  //   iconName: "portfolio",
  //   count: null,
  //   color: "boxColor08",
  //   iconColor: "boxColor12",
  //   navigationPath: ROUTES.PORTFOLIO,
  // },
  {
    name: "CAMPAIGNS",
    iconName: "campaigns",
    count: null,
    color: "boxColor09",
    iconColor: "boxColor13",
    navigationPath: ROUTES.CAMPAIGNS,
  },
  // {
  //   name: "REPORT",
  //   iconName: "report",
  //   count: null,
  //   color: "boxColor10",
  //   iconColor: "boxColor14",
  //   navigationPath: null,
  // },
  // {
  //   name: "REVENUE",
  //   iconName: "revenue",
  //   count: null,
  //   color: "boxColor18",
  //   iconColor: "boxColor15",
  //   navigationPath: null,
  // },
];
