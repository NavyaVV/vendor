import { navigationRef } from "@config/NavigationHelper";
import { IconTypes } from "@typings/IconTypes";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React from "react";
import DrawerContentThemeToggle from "./DrawerContentThemeToggle";

const textStyle = { flex: 1 };
interface renderProps {
  icon: IconTypes;
  label?: string;
  onPress: () => void;
  route?: string;
}
export default ({ icon, label, onPress, route }: renderProps) => {
  const root = navigationRef.current?.getCurrentRoute();

  return (
    <TouchableBox
      height={49}
      width="100%"
      padding="l"
      marginBottom="l"
      borderRadius="m"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      disabled={label === "Dark/Light"}
      backgroundColor={root?.name === route ? "drawerActiveColor" : "primary"}
      onPress={onPress}
    >
      <Box
        width={33}
        height={33}
        backgroundColor="boxColor38"
        justifyContent="center"
        borderRadius="xl"
        alignItems="center"
      >
        <IconBold name={icon} size={11} color="textColor09" />
      </Box>
      <Text
        style={textStyle}
        marginLeft="xl"
        variant="regular14"
        color="textColor09"
      >
        {label}
      </Text>
      {label === "Dark/Light" && <DrawerContentThemeToggle />}
    </TouchableBox>
  );
};
