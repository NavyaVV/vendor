import LogoutPopup from "@components/LogoutPopup";
import { navigate } from "@config/NavigationHelper";
import {
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { drawerData } from "@utils/DrawerData";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import DrawerRenderFunction from "./DrawerRenderFunction";

export default () => {
  const drawerStatus = useDrawerStatus();
  const [showPopup, setShowPopup] = useState(false);
  const navigation = useNavigation();

  const handleDrawerClose = () => {
    navigation.dispatch(DrawerActions.closeDrawer);
  };

  return (
    <>
      <DrawerContentScrollView showsVerticalScrollIndicator={false}>
        <TouchableBox onPress={handleDrawerClose}>
          <IconBold name="menu" size={27} color="textColor09" />
        </TouchableBox>
        <DrawerHeader />
        {drawerData.map((item, index) => (
          <DrawerRenderFunction
            key={index}
            label={item.name}
            icon={item.iconName}
            route={item.move}
            onPress={() => navigate(item.move)}
          />
        ))}
        <TouchableBox
          height={49}
          padding="l"
          marginTop="x3l"
          flexDirection="row"
          alignItems="center"
          onPress={() => setShowPopup(true)}
        >
          <Box
            width={33}
            height={33}
            backgroundColor="boxColor38"
            justifyContent="center"
            borderRadius="xl"
            alignItems="center"
          >
            <IconBold name="logout" size={11} color="textColor09" />
          </Box>
          <Text marginLeft="xl" variant="regular14" color="textColor09">
            Logout
          </Text>
        </TouchableBox>
        <Text
          variant="regular10"
          color="textColor09"
          textAlign="center"
          marginTop="x2l"
          marginBottom="x3l"
        >
          Version V1.001
        </Text>
      </DrawerContentScrollView>
      {drawerStatus === "open" && (
        <TouchableBox
          onPress={handleDrawerClose}
          start={-18}
          bottom="50%"
          borderWidth={1}
          position="absolute"
          height={75}
          width={40}
          justifyContent="center"
          alignItems="center"
          borderColor="tabIconInactive"
          backgroundColor="drawerActiveColor"
          borderRadius="xxl"
        >
          <IconBold name="rightArrow" size={18} color="secondary" />
        </TouchableBox>
      )}
      <LogoutPopup visible={showPopup} close={() => setShowPopup(false)} />
    </>
  );
};
