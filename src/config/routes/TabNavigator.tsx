import tabBar from "@components/tabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Products } from "@screens/regular";
import CampaignsList from "@screens/regular/Campaigns/CampaignsList";
import { Profile } from "@screens/regular/Profiles";

import { AppTabParamList } from "@typings/Navigation";
import React from "react";
import ROUTES from "./routes";

const Tab = createBottomTabNavigator<AppTabParamList>();

export default () => (
  <Tab.Navigator tabBar={tabBar} initialRouteName={ROUTES.HOME}>
    <Tab.Screen
      name={ROUTES.HOME}
      component={Home}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name={ROUTES.CAMPAIGNS}
      component={CampaignsList}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name={ROUTES.PRODUCTS}
      component={Products}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name={ROUTES.PROFILE}
      component={Profile}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);
