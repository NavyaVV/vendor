import { IconBold } from "@utils/IconRegular";
import { TouchableBox, useTheme } from "@utils/Theme";
import React from "react";

interface floatingAddProps {
  onPress?: () => void;
}

export default ({ onPress }: floatingAddProps) => {
  const { iconSize } = useTheme();

  return (
    <TouchableBox
      end={20}
      bottom={25}
      padding="l"
      borderRadius="x5l"
      position="absolute"
      backgroundColor="primary"
      onPress={onPress}
    >
      <IconBold name="addCircle" color="secondary" size={iconSize.x3l} />
    </TouchableBox>
  );
};
