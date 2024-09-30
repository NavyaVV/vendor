import React from "react";
import { Platform, Text, TextProps } from "react-native";
import translate from "@config/i18n";

export interface translatedProps extends TextProps {
  children: string;
  variables?: any;
  style?: any;
  androidTranslation?: string;
}

export default React.memo((props: translatedProps): JSX.Element => {
  const { children, variables, androidTranslation } = props;

  if (androidTranslation && Platform.OS === "android")
    return <Text {...props}>{translate(androidTranslation, variables)}</Text>;

  return <Text {...props}>{translate(children, variables)}</Text>;
});
