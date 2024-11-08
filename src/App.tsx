import Root from "./config/RootNavigator";
import ThemeProvider from "./utils/Theme";
import React, { useEffect } from "react";
import { setI18nConfig } from "@config/i18n";
import { StatusBar } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import SplashScreen from "react-native-splash-screen";
import { Alert } from "@components/AlertPopup";

export default () => {
  useEffect(() => {
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    setI18nConfig(() => {
      SplashScreen.hide();
    }, "en");
  }, []);

  return (
    <>
      <StatusBar
        animated
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ThemeProvider darkMode={false}>
        <MenuProvider>
          <Root />
          {/* <Alert /> */}
        </MenuProvider>
      </ThemeProvider>
    </>
  );
};
