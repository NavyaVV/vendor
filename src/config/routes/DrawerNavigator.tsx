import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { WIDTH } from "@utils/dimensions";
import HomeNavigator from "./HomeNavigator";
import { HomeStackParamList } from "@typings/Navigation";
import drawer from "@components/Drawer";
import { useTheme } from "@utils/Theme";
import { ROUTES } from ".";

const Drawer = createDrawerNavigator<HomeStackParamList>();
export default () => {
  const { colors, borderRadii, spacing } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.HOME}
      drawerContent={drawer}
      screenOptions={{
        drawerStyle: {
          width: WIDTH * 0.8,
          paddingHorizontal: spacing.x3l,
          backgroundColor: colors.boxColor37,
          borderBottomLeftRadius: borderRadii.x4l,
          borderTopLeftRadius: borderRadii.x4l,
        },
      }}
    >
      <Drawer.Screen
        name={ROUTES.HOME}
        component={HomeNavigator}
        options={{
          headerShown: false,
          drawerPosition: "right",
          drawerType: "front",
        }}
      />
    </Drawer.Navigator>
  );
};
