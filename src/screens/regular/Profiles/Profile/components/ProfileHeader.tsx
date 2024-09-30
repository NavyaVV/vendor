import { useNavigation } from "@react-navigation/native";
import { IconTypes } from "@typings/IconTypes";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, useTheme } from "@utils/Theme";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface functionProp {
  headerText: string;
  iconName?: IconTypes;
  iconsName?: IconTypes;

  onPress?: () => void;
}
export default ({ iconName, headerText, iconsName, onPress }: functionProp) => {
  const { spacing } = useTheme();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Box
      width="100%"
      alignItems="center"
      flexDirection="row"
      paddingHorizontal="xxl"
      marginStart="l"
      marginEnd="xl"
      justifyContent="space-between"
      style={{ paddingTop: top + spacing.l }}
    >
      {iconName && (
        <TouchableBox onPress={() => navigation.goBack()}>
          <IconBold name={iconsName} size={20} color="primary" />
        </TouchableBox>
      )}
      <Text variant="regular17" color="textColor12" marginStart="x3l">
        {headerText}
      </Text>

      {iconName && (
        <TouchableBox onPress={onPress}>
          <IconBold name={iconName} size={18} color="textColor12" />
        </TouchableBox>
      )}
    </Box>
  );
};
