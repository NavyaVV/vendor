import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { NavigationHelpers } from "@react-navigation/core";
import { ParamListBase, TabNavigationState } from "@react-navigation/routers";
import { IconTypes } from "@typings/IconTypes";
import { BOTTOM_TAB } from "@utils/dimensions";
import { IconBold } from "@utils/IconRegular";
import { Box, TrText } from "@utils/Theme";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

interface bottomTabProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: EdgeInsets;
}

export default ({
  insets,
  state: { index, routes },
  navigation,
}: bottomTabProps) => {
  return (
    <Box
      width="100%"
      height={BOTTOM_TAB + insets.bottom}
      style={{ paddingBottom: insets.bottom * 0.5 }}
      backgroundColor="secondary"
      flexDirection="row"
      borderTopLeftRadius="xl"
      borderTopRightRadius="xl"
      shadowColor="textColor01"
      shadowOffset={{ width: 1, height: 1 }}
      shadowOpacity={0.2}
      shadowRadius={2}
      elevation={3}
      position="absolute"
      bottom={0}
    >
      {routes.map(({ name, key }, i) => {
        const handlePress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: key,
            canPreventDefault: true,
          });

          if (index !== i && !event.defaultPrevented) navigation.navigate(name);
        };

        return (
          <TouchableWithoutFeedback key={key} onPress={handlePress}>
            <Box flex={1} alignItems="center" justifyContent="center">
              <IconBold
                size={25}
                name={`${name.toLowerCase()}TabIcon` as IconTypes}
                color={index === i ? "primary" : "tabIconInactive"}
              />
              <TrText
                marginTop="m"
                variant="regular7"
                color={index === i ? "primary" : "tabIconInactive"}
              >
                {name.toUpperCase()}
              </TrText>
            </Box>
          </TouchableWithoutFeedback>
        );
      })}
    </Box>
  );
};
