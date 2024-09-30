import { ROUTES } from "@config/routes";

export const drawerData = [
  { name: "My Account", iconName: "user", move: ROUTES.PROFILE },
  { name: "My Wallet", iconName: "wallet", move: ROUTES.MYWALLET },
  {
    name: "Change Password",
    iconName: "password",
    move: ROUTES.CHANGEPASSWORD,
  },
  { name: "Settings", iconName: "settings", move: ROUTES.CAMPAIGNS },
  { name: "Dark/Light", iconName: "darkMode", move: ROUTES.ADDSERVICES },
  { name: "Notifications", iconName: "bell", move: ROUTES.SERVICES },
  { name: "Help", iconName: "help", move: ROUTES.HOME },
] as const;
