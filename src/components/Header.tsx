import { DrawerActions, useNavigation } from "@react-navigation/native";
import { IconTypes } from "@typings/IconTypes";
import { IconBold } from "@utils/IconRegular";
import {
  Box,
  Text as NormalText,
  TouchableBox,
  TrText,
  useTheme,
} from "@utils/Theme";
import React, { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface functionProp {
  prefix?: string;
  headerTrText?: string;
  headerText?: string;
  iconName?: IconTypes;
  onPress?: () => void;
}

export default ({
  prefix,
  iconName,
  headerText,
  headerTrText,
  onPress,
}: functionProp) => {
  const { spacing } = useTheme();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const Text = headerText ? NormalText : TrText;

  const handleRightIcon = useCallback(() => {
    if (iconName !== "menu" && !!onPress) onPress();
    else navigation.dispatch(DrawerActions.openDrawer);
  }, [iconName, navigation, onPress]);

  return (
    <Box
      width="100%"
      alignItems="center"
      flexDirection="row"
      paddingHorizontal="xxl"
      backgroundColor="headerColor"
      justifyContent="space-between"
      borderColor="borderColor01"
      paddingBottom="xxl"
      borderBottomWidth={1}
      style={{ paddingTop: top + spacing.xxl }}
    >
      <TouchableBox onPress={() => navigation.goBack()}>
        <IconBold name="backArrow" size={20} color="primary" />
      </TouchableBox>
      <Box flexDirection="row" alignItems="center">
        {(prefix && (
          <NormalText
            variant="regular17"
            color="primary"
          >{`${prefix} -`}</NormalText>
        )) ||
          null}
        <Text variant="regular17" color="primary" marginStart="l">
          {headerTrText ?? headerText ?? ""}
        </Text>
      </Box>
      {iconName && (
        <TouchableBox onPress={handleRightIcon}>
          <IconBold
            name={iconName}
            size={iconName === "menu" ? 27 : 20}
            color="primary"
          />
        </TouchableBox>
      )}
    </Box>
  );
};
