import { DrawerActions, useNavigation } from "@react-navigation/native";
import { IconBold } from "@utils/IconRegular";
import { images } from "@utils/Images";
import { Box, Image, TouchableBox, useTheme } from "@utils/Theme";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const { spacing } = useTheme();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Box
      paddingBottom="l"
      alignItems="center"
      flexDirection="row"
      marginHorizontal="xxl"
      justifyContent="space-between"
      style={{ paddingTop: spacing.xxl + top * 0.5 }}
    >
      <Image
        source={images.logo.source}
        height={100 * images.logo.aspectRatio}
        width={100}
      />
      <TouchableBox
        onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
      >
        <IconBold name="menu" size={27} color="primary" />
      </TouchableBox>
    </Box>
  );
};
